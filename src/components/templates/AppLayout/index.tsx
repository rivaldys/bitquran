import { Footer, Header } from 'bitquran/components'
import { AppLayoutProps } from 'bitquran/types'
import Head from 'next/head'

export default function AppLayout({ children }: AppLayoutProps)
{
    return (
        <>
            <Head>
                <title>Bitquran &#8211; Baca Al-Qur'an secara Daring</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="description" content="Website yang menyajikan kitab suci Al-Qur'an secara digital. Dilengkapi terjemahan, tafsir, dan audio ayat (murottal)." />
                <meta name="keywords" content="Bitquran, Al-Qur'an Digital, Al-Qur'an Online, Al-Qur'an Daring, Al-Qur'an Indonesia" />
                <meta name="twitter:title" content="Bitquran &#8211; Baca Al-Qur'an secara Daring" />
                <meta name="twitter:description" content="Website yang menyajikan kitab suci Al-Qur'an secara digital. Dilengkapi terjemahan, tafsir, dan audio ayat (murottal)." />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_URL}/cover-image.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="og:title" content="Bitquran &#8211; Baca Al-Qur'an secara Daring" />
                <meta property="og:description" content="Website yang menyajikan kitab suci Al-Qur'an secara digital. Dilengkapi terjemahan, tafsir, dan audio ayat (murottal)." />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/cover-image.png`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Bitquran" />
            </Head>

            <Header />

            <main className="content-container min-h-[calc(100vh-210px)] mt-[105px]">
                {children}
            </main>

            <Footer />
        </>
    )
}