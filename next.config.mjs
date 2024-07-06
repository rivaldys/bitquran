/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    redirects() {
        return [
            {
                source: '/surah',
                destination: '/',
                permanent: true
            },
            {
                source: '/surah/:id/tafsir',
                destination: '/surah/:id',
                permanent: true
            }
          ]
    }
}

export default nextConfig