import { InputProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'

const inputStyle = cva('w-full border border-[#80cbc4] bg-[#e0f2f1] box-border focus:outline-none px-[15px] py-[12px] rounded-lg focus:shadow-[0_0_8px_rgba(178,223,219,0.85)]')

export default function Input({ className, ...rest }: InputProps)
{
    return (
        <input
            className={inputStyle({ className })}
            spellCheck={false}
            {...rest}
        />
    )
}