/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    redirects() {
        return [
            {
                source: '/surat',
                destination: '/',
                permanent: true
            },
            {
                source: '/surat/:id/tafsir',
                destination: '/surat/:id',
                permanent: true
            }
          ]
    }
}

export default nextConfig