import { ILLogoWide } from 'bitquran/images'
import { cva } from 'class-variance-authority'

export interface AppLogoProps {
    className?: string
}

const appLogoStyle = cva('bg-[length:100%] bg-no-repeat bg-center')

export default function AppLogo({ className }: AppLogoProps)
{
    return (
        <img
            className={appLogoStyle({ className })}
            src={ILLogoWide}
            alt="App logo"
        />
    )
}