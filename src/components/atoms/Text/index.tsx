import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode
    className?: string
}

const textStyle = cva('text-[15px] leading-[25px] mb-[10px]')

export default function Text({ children, className }: TextProps)
{
    return (
        <p className={textStyle({ className })}>
            {children}
        </p>
    )
}