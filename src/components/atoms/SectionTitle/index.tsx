import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
    className?: string
}

const sectionTitleStyle = cva('text-[20px] leading-[27px] font-normal mb-[10px]')

export default function SectionTitle({ children, className, ...rest }: SectionTitleProps)
{
    return <h3 className={sectionTitleStyle({ className })} {...rest}>{children}</h3>
}