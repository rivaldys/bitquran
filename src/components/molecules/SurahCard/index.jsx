import React from 'react'
import './index.css'

const SurahCard = (props) =>
{
    return (
        <div className="surah-card" onClick={() => props.detail(props.data.nomor)}>
            <p>{props.data.nama_latin}</p>
        </div>
    )
}

export default SurahCard