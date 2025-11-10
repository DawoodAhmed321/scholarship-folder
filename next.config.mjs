/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "9000",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "admin.scholarshipfolder.cloud",
    //   },

    //   {
    //     protocol: "http",
    //     hostname: "admin.scholarshipfolder.cloud",
    //   },

    //   {
    //     protocol: "http",
    //     hostname: "scholarshipfolder.cloud",
    //   },
    // ],
    remotePatterns : [
      {
        protocol: 'https',
        hostname: '**', // allow all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // allow all hostnames
      },
    ]
  },
};

export default nextConfig;
