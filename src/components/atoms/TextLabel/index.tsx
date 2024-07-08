import { TextLabelProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'

const textLabelStyle = cva('block text-[15px] leading-[25px] mb-[10px] font-normal')

export default function TextLabel({ children, className, ...rest }: TextLabelProps)
{
    return (
        <label
            className={textLabelStyle({ className })}
            {...rest}
        >
            {children}
        </label>
    )
}