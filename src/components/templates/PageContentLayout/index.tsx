import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

export interface PageContentLayoutProps {
    children: ReactNode
    className?: string
}

const pageLayoutStyle = cva('w-[calc(1024px-30px)] min-h-[calc(100vh-210px)] bg-white p-[30px] m-auto rounded-[10px] shadow-[0_0_10px_rgba(234,234,234,0.8)] box-border')

export default function PageContentLayout({ children, className }: PageContentLayoutProps)
{
    return (
        <div className={pageLayoutStyle({ className })}>
            {children}
        </div>
    )
}