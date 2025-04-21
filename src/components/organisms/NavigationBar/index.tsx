import { useDeviceTypeWatcher } from 'bitquran/utils'
import { AppLogo, Icon } from 'components/atoms'
import Link from 'next/link'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

const navigations = [
    { id: 1, name: 'Beranda', path: '/' },
    { id: 2, name: 'Tentang', path: '/tentang' },
    { id: 3, name: 'Riwayat Pembaruan', path: '/riwayat-pembaruan' },
]

interface DrawerProps {
    isShown: boolean,
    setIsShown: Dispatch<SetStateAction<boolean>>
}

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

function Drawer({ isShown, setIsShown }: DrawerProps)
{
    return (
        <>
            <div className={`bg-[rgba(0,0,0,0.5)] h-full fixed right-0 top-0 transition-[visibility,opacity,transform] duration-300 w-full z-10 ${
                isShown ? 'block opacity-1 scale-100 delay-[0s,0s,0s] visibility-visible' : 'hidden opacity-0 scale-[1.1] delay-[0s,0s,250ms] visibility-hidden'
            }`} />

            <div className={`bg-white h-full overflow-x-hidden pt-[52px] fixed right-0 top-0 transition-[margin-right] duration-300 w-[250px] z-20 ${
                isShown ? 'mr-0' : '-mr-[250px]'
            }`}>
                <button
                    className="flex items-center justify-center bg-[#f2f2f2] text-[#c1c1c1] text-[20px] w-[45px] h-[45px] rounded-bl-[15px] cursor-pointer absolute top-0 right-0"
                    onClick={() => setIsShown(false)}
                    aria-label="Close menu"
                >
                    &times;
                </button>

                <nav>
                    <ul className="list-none overflow-hidden mx-[15px] mb-0">
                        {navigations.map((navigation, index) => (
                            <li key={`link-${index+1}`}>
                                <Link
                                    className="block transition duration-300 text-[#757575] text-sm leading-[21px] font-light px-[15px] py-[10px] rounded-lg border-b-[1px] border-b-[#f5f5f5] hover:text-[#4CAF50] hover:cursor-pointer hover:bg-[#f5f5f5]"
                                    href={navigation.path}
                                    key={navigation.id}
                                >
                                    {navigation.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default function NavigationBar()
{
    const deviceType = useDeviceTypeWatcher()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isDrawerShown, setIsDrawerShown] = useState(false)

    const handleScroll = useCallback(() => {
        setIsScrolled(window.pageYOffset > 0)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

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
                        <button
                            onClick={() => setIsDrawerShown(true)}
                            aria-label="Open menu"
                        >
                            <Icon name="menu" size={30} color="#c1c1c1" />
                        </button>

                        <Drawer isShown={isDrawerShown} setIsShown={setIsDrawerShown} />
                    </>
                )}
            </div>
        </header>

    )
}