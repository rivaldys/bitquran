import { cva } from 'class-variance-authority'
import { type LinkProps, Link } from 'react-router-dom'

interface TextLinkProps extends LinkProps {}

const textLinkStyle = cva('text-[#4caf50] transition duration-300 hover:opacity-50')

export default function TextLink({ children, className, to, ...rest }: TextLinkProps)
{
    return (
        <Link
            to={to}
            className={textLinkStyle({ className })}
            {...rest}
        >
            {children}
        </Link>
    )
}