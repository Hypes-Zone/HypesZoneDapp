/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONNECTION_RPC_URI: process.env.CONNECTION_RPC_URI,
    API_URL: process.env.API_URL,
    DEBUG: process.env.DEBUG,
  }
};

export default nextConfig;
