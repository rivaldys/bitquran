import { AppLogo, Backdrop, Icon } from 'bitquran/components'
import { routes } from 'bitquran/router'
import { getNavbarRoutes } from 'bitquran/router/core'
import { useDeviceTypeWatcher } from 'bitquran/shared/hooks'
import type { Route } from 'bitquran/shared/types'
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

let _cachedNavbarRoutes: Route[] | null = null
const getCachedNavbarRoutes = (): Route[] => {
    if (!_cachedNavbarRoutes) _cachedNavbarRoutes = getNavbarRoutes(routes)
    return _cachedNavbarRoutes
}

interface DrawerProps {
    isShown: boolean
    setIsShown: Dispatch<SetStateAction<boolean>>
}

function Regular() {
    const navbarRoutes = getCachedNavbarRoutes()

    return (
        <nav>
            <ul className="flex list-none mb-0">
                {navbarRoutes
                    .filter(route => route.path)
                    .map((route, index) => (
                        <li key={`link-${index + 1}`}>
                            <Link
                                className="block transition duration-300 text-[#757575] text-sm leading-5.25 font-normal px-5 py-1.25 hover:text-[#4CAF50] hover:cursor-pointer"
                                to={route.path!}
                            >
                                {route.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}

function Drawer({ isShown, setIsShown }: DrawerProps) {
    const navbarRoutes = getCachedNavbarRoutes()

    return (
        <>
            <Backdrop isShown={isShown} onClick={() => setIsShown(false)} />

            <aside
                data-role="drawer"
                className={`bg-white h-full overflow-x-hidden pt-13 fixed right-0 top-0 transition-[margin-right] duration-300 w-62.5 z-20 ${
                    isShown ? 'mr-0' : '-mr-62.5'
                }`}
            >
                <button
                    className="flex items-center justify-center bg-[#f2f2f2] text-[#c1c1c1] text-[20px] w-11.25 h-11.25 rounded-bl-[15px] cursor-pointer absolute top-0 right-0"
                    onClick={() => setIsShown(false)}
                    aria-label="Tutup menu"
                >
                    &times;
                </button>

                <nav>
                    <ul className="list-none overflow-hidden mx-3.75 mb-0">
                        {navbarRoutes
                            .filter(route => route.path)
                            .map((route, index) => (
                                <li key={`link-${index + 1}`}>
                                    <Link
                                        className="block transition duration-300 text-[#757575] text-sm leading-5.25 font-light px-3.75 py-2.5 rounded-lg border-b border-b-[#f5f5f5] hover:text-[#4CAF50] hover:cursor-pointer hover:bg-[#f5f5f5]"
                                        to={route.path!}
                                        onClick={() => setIsShown(false)}
                                    >
                                        {route.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default function NavigationBar() {
    const deviceType = useDeviceTypeWatcher()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isDrawerShown, setIsDrawerShown] = useState(false)

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 0)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <header
            className={`h-16.25 sm:h-18.75 w-full flex items-center fixed top-0 z-10 bg-white border-b border-b-[#eaeaea] box-border ${
                isScrolled
                    ? 'shadow-[0_0_10px_hsla(0,0%,50%,0.3)] transition-shadow duration-300 ease-linear'
                    : ''
            }`}
        >
            <div className="content-container flex justify-between items-center">
                <Link className="outline-none" to="/">
                    <AppLogo className="w-27.5 sm:w-35.5 mb-1.25 sm:mb-2.5" />
                </Link>

                {deviceType === 'desktop' ? (
                    <Regular />
                ) : (
                    <>
                        <button onClick={() => setIsDrawerShown(true)} aria-label="Buka menu">
                            <Icon name="menu" size={30} color="#c1c1c1" />
                        </button>

                        <Drawer isShown={isDrawerShown} setIsShown={setIsDrawerShown} />
                    </>
                )}
            </div>
        </header>
    )
}
