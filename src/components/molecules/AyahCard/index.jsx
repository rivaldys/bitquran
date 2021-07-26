import React from 'react'
import './index.css'

const AyahCard = (props) =>
{
    console.log(props)
    return (
        <div className="ayah-card">
            <div className="ayah-toolbar">
                <div className="ayah-number">{props.ayah.number.inSurah}</div>
            </div>

            <p className="ayah-ar">{props.ayah.text.arab}</p>
            <p className="ayah-idn">{props.ayah.translation.id}</p>
        </div>
    )
}

export default AyahCard