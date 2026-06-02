import { BackToTop, Footer, NavigationBar } from 'bitquran/components'
import { Suspense, type ReactNode } from 'react'
import { Skeleton } from 'bitquran/components'

export interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <NavigationBar />

            <main className="content-container min-h-[calc(100vh-210px)] mt-[85px] sm:mt-[105px]">
                <Suspense fallback={<Skeleton height={400} />}>{children}</Suspense>
            </main>

            <BackToTop />

            <Footer />
        </>
    )
}
