import './Backdrop.css'

export interface BackdropProps {
    isShown: boolean
    onClick?: () => void
}

export default function Backdrop({ isShown, onClick }: BackdropProps) {
    return (
        <div
            data-role="backdrop"
            className={`backdrop${isShown ? ` show` : ''}`}
            onClick={onClick}
        />
    )
}
