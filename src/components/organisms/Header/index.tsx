import { AppLogo } from 'bitquran/components'
import Link from 'next/link'

export default function Header()
{
    return (
        <header className="h-[75px] w-full flex items-center fixed top-0 z-10 bg-white border-b-[1px] border-b-[#eaeaea] box-border">
            <div className="content-container">
                <Link href="/">
                    <AppLogo className="w-[142px] mb-[10px]" />
                </Link>
            </div>
        </header>
    )
}