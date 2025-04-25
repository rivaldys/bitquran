import styles from './Backdrop.module.css'

interface BackdropProps {
    isShown: boolean
}

export default function Backdrop({ isShown }: BackdropProps)
{
    return <div data-role="backdrop" className={`${styles.backdrop}${isShown ? ` ${styles.show}` : ''}`} />
}