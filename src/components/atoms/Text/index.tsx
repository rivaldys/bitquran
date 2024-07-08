import { TextProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'

const textStyle = cva('text-[15px] leading-[25px] mb-[10px]')

export default function Text({ children, className }: TextProps)
{
    return (
        <p className={textStyle({ className })}>
            {children}
        </p>
    )
}