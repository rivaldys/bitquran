import React, { Component } from 'react'
// import './index.css'
import '../../components/molecules/AyahCard/index.css'

class Tafsir extends Component
{
    render()
    {
        const data = this.props.location.state
        const surahNumber = data.surahNumber
        const ayahNumber  = data.ayah.number.inSurah
        const srcAudio    = data.ayah.audio.primary
        const audioId     = `surah-${surahNumber}-audio-${ayahNumber}`
        const buttonId    = `audio-button-${surahNumber}-${ayahNumber}`
        const playIcon    = `play-${surahNumber}-${ayahNumber}`
        const pauseIcon   = `pause-${surahNumber}-${ayahNumber}`

        return (
            <div className="content-bg content-margin">
                <p>Halaman Tafsir</p>
                <div className="ayah-card">
                    <div className="ayah-toolbar">
                        <div className="ayah-number">{ayahNumber}</div>
                        
                        <div className="action-wrapper">
                            <audio id={audioId} src={srcAudio} />
                            <button id={buttonId} className="audio-button" title="Audio Ayat/Murottal" onClick={() => alert('test')} data-play="false">
                                <svg aria-hidden="true" id={playIcon} focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                                </svg>
                                <svg aria-hidden="true" id={pauseIcon} focusable="false" data-prefix="fas" data-icon="pause" className="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p className="ayah-ar"></p>
                    <p className="ayah-idn"></p>
                </div>
            </div>
        )
    }
}

export default Tafsir