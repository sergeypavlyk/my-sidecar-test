/** @type {import('next').NextConfig} */
 
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  productionBrowserSourceMaps: true,
  images: { unoptimized: true }
};

export default nextConfig;
