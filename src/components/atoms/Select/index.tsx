import { SelectOptionProps, SelectProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'

const selectStyle = cva('w-full border-none rounded-[7px] p-[10px]', {
    variants:
    {
        variant:
        {
            enabled: 'bg-[#80cbc4] text-white focus:outline-none focus:shadow-[0px_0px_10px_rgba(178,223,219,0.85)]',
            disabled: 'bg-gray-50'
        }
    },
    defaultVariants:
    {
        variant: 'enabled'
    }
})

function Select({ children, className, disabled, ...rest }: SelectProps)
{
    return (
        <select
            className={selectStyle({ className, variant: disabled ? 'disabled' : undefined })}
            disabled={disabled}
            {...rest}
        >
            {children}
        </select>
    )
}

function Option({ children, ...rest }: SelectOptionProps)
{
    return <option {...rest}>{children}</option>
}

Select.Option = Option

export default Select