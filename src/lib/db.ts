// lib/db.ts
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

interface QueryConfig<T extends QueryResultRow> {
  text: string;
  params?: any[];
  rowMapper?: (row: QueryResultRow) => T;
}

class PostgreSQLClient {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }

  async query<T extends QueryResultRow>(config: QueryConfig<T>): Promise<T[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(config.text, config.params);
      return config.rowMapper 
        ? result.rows.map(config.rowMapper)
        : result.rows as T[];
    } finally {
      client.release();
    }
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client: PoolClient = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

export const db = new PostgreSQLClient();