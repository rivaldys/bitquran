import { BackToTop, Footer, NavigationBar, Skeleton } from 'bitquran/components'
import { Suspense, type ReactNode } from 'react'

export interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <NavigationBar />

            <main className="content-container min-h-[calc(100vh-210px)] mt-21.25 sm:mt-26.25">
                <Suspense fallback={<Skeleton height={400} />}>{children}</Suspense>
            </main>

            <BackToTop />

            <Footer />
        </>
    )
}
