/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.js",
    },
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "t8ycfkr4pi.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
};

module.exports = nextConfig;
