import { ContentSectionProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'

const contentSectionStyle = cva('border-b-[1px] border-b-[#f2f2f2] pb-[15px] mb-[35px]')

export default function ContentSection({ children, className, disableBottomSepartor }: ContentSectionProps)
{
    return (
        <div className={contentSectionStyle({ className })}>
            {children}
        </div>
    )
}