const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    missingSuspenseWithCSRBailout: false 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig