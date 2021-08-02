import React from 'react'
import { useHistory } from 'react-router'
import './index.css'

const AyahCard = (props) =>
{
    const history  = useHistory()
    const pathName = history.location.pathname

    const { surahNumber, ayahNumber, ayahAudio, ayah, ayahTranslation, getPlay } = props

    const audioId   = `surah-${surahNumber}-audio-${ayahNumber}`
    const buttonId  = `audio-button-${surahNumber}-${ayahNumber}`
    const playIcon  = `play-${surahNumber}-${ayahNumber}`
    const pauseIcon = `pause-${surahNumber}-${ayahNumber}`

    const goToTafsir = () =>
    {
        history.push(`${pathName}/tafsir/${ayahNumber}`)
    }

    return (
        <div className="ayah-card">
            <div className="ayah-toolbar">
                <div className="ayah-number">{ayahNumber}</div>
                
                <div className="action-wrapper">
                    <audio id={audioId} src={ayahAudio} />
                    <button id={buttonId} className="audio-button" title="Audio Ayat/Murottal" onClick={() => getPlay(audioId, buttonId, playIcon, pauseIcon)} data-play="false">
                        <svg aria-hidden="true" id={playIcon} focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                        </svg>
                        <svg aria-hidden="true" id={pauseIcon} focusable="false" data-prefix="fas" data-icon="pause" className="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                        </svg>
                    </button>

                    <button className="tafsir-button" title="Tafsir Ayat" onClick={() => goToTafsir()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <rect x="96" y="48" width="320" height="416" rx="48" ry="48" strokeLinejoin="round" strokeWidth="32"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 128h160M176 208h160M176 288h80"/>
                        </svg>
                    </button>
                </div>
            </div>

            <p className="ayah-ar">{ayah}</p>
            <p className="ayah-idn">{ayahTranslation}</p>
        </div>
    )
}

export default AyahCard