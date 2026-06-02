import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'

export interface PageContentLayoutProps {
    children: ReactNode
    className?: string
}

const pageLayoutStyle = cva(
    'w-full min-h-[calc(100vh-210px)] bg-white p-[20px] sm:p-[30px] rounded-[7px] sm:rounded-[10px] shadow-[0_0_10px_rgba(234,234,234,0.8)] box-border'
)

export default function PageContentLayout({ children, className }: PageContentLayoutProps) {
    return <div className={pageLayoutStyle({ className })}>{children}</div>
}
