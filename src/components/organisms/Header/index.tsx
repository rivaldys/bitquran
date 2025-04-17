import { AppLogo, NavigationBar } from 'bitquran/components'
import { useDeviceTypeWatcher } from 'bitquran/hooks'
import Link from 'next/link'

export default function Header()
{
    const deviceType = useDeviceTypeWatcher()

    return (
        <header className="h-[65px] sm:h-[75px] w-screen sm:w-full flex items-center fixed top-0 z-10 bg-white border-b-[1px] border-b-[#eaeaea] box-border">
            <div className="content-container flex justify-between items-center box-border">
                <Link className="outline-none" href="/">
                    <AppLogo className="w-[142px] mb-[10px]" />
                </Link>

                <NavigationBar type={deviceType === 'mobile' ? 'drawer' : ''} />
            </div>
        </header>
    )
}