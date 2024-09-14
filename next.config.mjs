/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fedskillstest.ct.digital',
            port: '',
            pathname: '/**',
          },
        ],
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
    
        return config;
      },
};



export default nextConfig;
