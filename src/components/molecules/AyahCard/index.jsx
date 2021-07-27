import React from 'react'
import './index.css'

const AyahCard = (props) =>
{
    // console.log(props)
    // const [ayahAudio, setAyahAudio] = useState(null)

    const sn = props.surahNumber
    const an = props.ayah.number.inSurah
    const audioId   = `surah-${sn}-audio-${an}`
    const buttonId  = `audio-button-${sn}-${an}`
    const playIcon  = `play-${sn}-${an}`
    const pauseIcon = `pause-${sn}-${an}`
    const srcAudio  = props.ayah.audio.primary

    return (
        <div className="ayah-card">
            <div className="ayah-toolbar">
                <div className="ayah-number">{an}</div>
                
                <div className="audio-wrapper">
                    <audio id={audioId} src={srcAudio} />
                    <button id={buttonId} className="audio-button" onClick={() => props.getPlay(audioId, buttonId, playIcon, pauseIcon)} data-play="false">
                        <svg aria-hidden="true" id={playIcon} focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                        </svg>
                        <svg aria-hidden="true" id={pauseIcon} focusable="false" data-prefix="fas" data-icon="pause" className="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">'
                            <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>'
                        </svg>
                    </button>
                </div>
            </div>

            <p className="ayah-ar">{props.ayah.text.arab}</p>
            <p className="ayah-idn">{props.ayah.translation.id}</p>
        </div>
    )
}

export default AyahCard