import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode
    className?: string
}

const textStyle = cva('text-sm sm:text-[15px] leading-6 sm:leading-[25px] mb-[10px]')

export default function Text({ children, className, ...rest }: TextProps) {
    return (
        <p className={textStyle({ className })} {...rest}>
            {children}
        </p>
    )
}
