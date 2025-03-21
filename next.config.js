/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'res.cloudinary.com', // Keep this if you're using Cloudinary
    ],
  },
}

module.exports = nextConfig