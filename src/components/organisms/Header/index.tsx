import { ReactNode } from 'react'

export interface HeaderProps {
    children: ReactNode
}

export default function Header({ children }: HeaderProps)
{
    return (
        <header className="h-[65px] sm:h-[75px] w-screen sm:w-full flex items-center fixed top-0 z-10 bg-white border-b-[1px] border-b-[#eaeaea] box-border">
            <div className="content-container flex justify-between items-center box-border">
                {children}
            </div>
        </header>
    )
}