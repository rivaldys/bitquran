import { useDeviceTypeWatcher } from 'bitquran/utils'
import { AppLogo, Icon } from 'components/atoms'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navigations = [
    {
        id: 1,
        name: 'Beranda',
        path: '/'
    },
    {
        id: 2,
        name: 'Tentang',
        path: '/tentang'
    },
    {
        id: 3,
        name: 'Riwayat Pembaruan',
        path: '/riwayat-pembaruan'
    },
]

function Regular()
{
    return (
        <nav>
            <ul className="flex list-none overflow-hidden mb-0">
                {navigations.map((navigation, index) => (
                    <li key={`link-${index+1}`}>
                        <Link
                            className="block transition duration-300 text-[#757575] text-sm leading-[21px] font-normal px-5 py-[5px] hover:text-[#4CAF50] hover:cursor-pointer"
                            href={navigation.path}
                            key={navigation.id}
                        >
                            {navigation.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

function Drawer()
{
    return (
        <></>
    )
}

export default function NavigationBar()
{
    const deviceType = useDeviceTypeWatcher()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`h-[65px] sm:h-[75px] w-screen sm:w-full flex items-center fixed top-0 z-10 bg-white border-b-[1px] border-b-[#eaeaea] box-border ${
            isScrolled ? 'shadow-[0_0_10px_hsla(0,_0%,_50%,_0.3)] transition-[box-shadow] duration-300 ease-linear' : ''
        }`}>
            <div className="content-container flex justify-between items-center box-border">
                <Link className="outline-none" href="/">
                    <AppLogo className="w-[110px] sm:w-[142px] mb-[5px] sm:mb-[10px]" />
                </Link>

                {deviceType === 'desktop' ? (
                    <Regular />
                ) : (
                    <>
                        <button>
                            <Icon name="menu" size={30} color="#c1c1c1" />
                        </button>

                        <Drawer />
                    </>
                )}
            </div>
        </header>
        
    )
}