import { cva } from 'class-variance-authority'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const inputStyle = cva('w-full border border-[#80cbc4] bg-[#e0f2f1] box-border font-light text-sm leading-[21px] sm:text-base sm:leading-[23px] focus:outline-none px-[15px] py-[12px] rounded-lg focus:shadow-[0_0_8px_rgba(178,223,219,0.85)]')

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