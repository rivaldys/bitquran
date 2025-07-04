import './index.css'

interface BackdropProps {
    isShown: boolean
}

export default function Backdrop({ isShown }: BackdropProps)
{
    return <div data-role="backdrop" className={`backdrop${isShown ? ` show` : ''}`} />
}