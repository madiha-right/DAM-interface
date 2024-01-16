/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app/automatic",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/app/automatic",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
