import { Html, Head, Main, NextScript } from 'next/document'

export default function Document()
{
    return (
        <Html lang="id">
            <Head>
                <link rel="icon" type="image/png" href="/logo.png" />
                <link rel="apple-touch-icon" type="image/png" href="/logo192.png" />
            </Head>
            <body className="text-[#757575] font-rubik font-light text-base leading-[23px] p-0 m-0 bg-[#f8f8f8]">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
