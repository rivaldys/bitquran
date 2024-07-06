import { AppLayout } from 'bitquran/components'
import 'bitquran/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps)
{
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    )
}
