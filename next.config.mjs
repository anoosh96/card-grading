/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // },
  images: {
    domains: ["card-grading.s3.amazonaws.com", "card-grading.s3.eu-north-1.amazonaws.com", "images.unsplash.com"],
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
  //     }
  //   ];
  // },
};
export default nextConfig;
