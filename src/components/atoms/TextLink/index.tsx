import { cva } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

export interface TextLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    rel?: string
    target?: string
}

const textLabelStyle = cva('text-[#4caf50] transition duration-300 hover:opacity-50')

export default function TextLink({ children, className, ...rest }: TextLinkProps)
{
    return (
        <Link
            className={textLabelStyle({ className })}
            {...rest}
        >
            {children}
        </Link>
    )
}