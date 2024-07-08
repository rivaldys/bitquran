import { TextLinkProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'
import Link from 'next/link'

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