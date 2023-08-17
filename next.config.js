/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.node$/,
  //     use: 'node-loader',
  //   });

  // return config;
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.node/,
  //     use: 'raw-loader',
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
