import React from 'react'
import { Link } from 'react-router-dom'

const Menubar = (props) =>
{
    const mode       = props.mode === 'desktop' ? 'menubar' : 'menubar-mobile'
    const closeEvent = props.mode === 'mobile' ? () => props.close() : null
    
    return (
        <ul className={mode}>
            <li><Link to="/" onClick={closeEvent}>Beranda</Link></li>
            <li><Link to="/tentang" onClick={closeEvent}>Tentang</Link></li>
            <li><Link to="/riwayat-pembaruan" onClick={closeEvent}>Riwayat Pembaruan</Link></li>
        </ul>
    )
}

export default Menubar