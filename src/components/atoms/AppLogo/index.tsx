import { ILLogoWide } from 'bitquran/images'
import { AppLogoProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'

const appLogoStyle = cva('bg-[length:100%] bg-no-repeat bg-center')

export default function AppLogo({ className }: AppLogoProps)
{
    return (
        <img
            className={appLogoStyle({ className })}
            src={ILLogoWide.src}
            alt="App logo"
        />
    )
}