import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

interface TextLinkProps extends Omit<LinkProps, 'to'> {
    children: ReactNode
    to: string
    className?: string
}

const textLinkStyle = cva('text-[#4caf50] transition duration-300 hover:opacity-50')

export default function TextLink({ children, className, to, ...rest }: TextLinkProps) {
    const isExternal = to.startsWith('http') || to.startsWith('mailto:')

    if (isExternal) {
        return (
            <a
                href={to}
                className={textLinkStyle({ className })}
                {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </a>
        )
    }

    return (
        <Link to={to} className={textLinkStyle({ className })} {...rest}>
            {children}
        </Link>
    )
}
