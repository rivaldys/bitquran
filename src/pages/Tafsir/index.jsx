import React, { Component } from 'react'
import './index.css'
import '../../components/molecules/AyahCard/index.css'

class Tafsir extends Component
{
    state =
    {
        data: [],
        prevPage: 0,
        nextPage: 0
    }

    componentDidMount()
    {
        const dataSet = this.props.location.state

        this.setState({
            data: dataSet,
            nextPage: dataSet.ayah.number.inSurah + 1
        })
    }

    componentDidUpdate()
    {
        console.log(this.state)
    }

    render()
    {
        const history = this.props.history
        const data    = this.props.location.state
        // const data    = this.state.data

        const surahNumber = data.surahNumber
        const ayahNumber  = data.ayah.number.inSurah
        const srcAudio    = data.ayah.audio.primary
        const audioId     = `surah-${surahNumber}-audio-${ayahNumber}`
        const buttonId    = `audio-button-${surahNumber}-${ayahNumber}`
        const playIcon    = `play-${surahNumber}-${ayahNumber}`
        const pauseIcon   = `pause-${surahNumber}-${ayahNumber}`

        return (
            <div className="content-bg content-margin">
                <div className="tafsir-header">
                    <button className="tafsir-back" onClick={() => this.history.goBack()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144"/>
                        </svg>
                    </button>
                    <div className="tafsir-title">
                        <p>Tafsir</p>
                        <h3>{data.surahName}</h3>
                        <span>Ayat {ayahNumber}</span>
                    </div>
                    <button className="tafsir-next">
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                        </svg>
                    </button>
                </div>

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

                    <p className="ayah-ar">{data.ayah.text.arab}</p>
                    <p className="ayah-idn">{data.ayah.translation.id}</p>
                </div>
                <div className="tafsir-card">
                    {data.ayah.tafsir.id.long}
                </div>
            </div>
        )
    }
}

export default Tafsir