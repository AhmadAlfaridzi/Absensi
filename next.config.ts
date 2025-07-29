const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    missingSuspenseWithCSRBailout: false 
  }
  eslint: {
    ignoreDuringBuilds: true, // Sementara nonaktifkan ESLint saat build
  },
  typescript: {
    ignoreBuildErrors: true, // Sementara izinkan TypeScript errors
  },
}

module.exports = nextConfig