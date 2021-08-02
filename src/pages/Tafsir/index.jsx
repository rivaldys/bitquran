import React, { Component } from 'react'
import QuranAPI from '../../services'
import './index.css'
import '../../components/molecules/AyahCard/index.css'

class Tafsir extends Component
{
    state =
    {
        surah:
        {
            number: 0,
            name: '',
            numberOfAyahs: 0
        },
        ayah:
        {
            number: 0,
            audio: '',
            text: '',
            translation: '',
            tafsir: ''
        },
        page:
        {
            prev: 0,
            next: 0
        }
    }

    getTafsir = () =>
    {
        let id     = this.props.match.params.id
        let ayahId = this.props.match.params.tafsirId

        QuranAPI.getAyah(id, ayahId).then(result =>
        {
            let ayah = result.data

            this.setState({
                surah:
                {
                    number: ayah.surah.number,
                    name: ayah.surah.name.transliteration.id,
                    numberOfAyahs: ayah.surah.numberOfVerses
                },
                ayah:
                {
                    number: ayah.number.inSurah,
                    audio: ayah.audio.primary,
                    text: ayah.text.arab,
                    translation: ayah.translation.id,
                    tafsir: ayah.tafsir.id.long
                },
                page:
                {
                    prev: (ayah.number.inSurah > 1) ? ayah.number.inSurah - 1 : null,
                    next: (ayah.number.inSurah < ayah.surah.numberOfVerses) ? ayah.number.inSurah + 1 : null
                }
            })
        })
    }

    goToPrevOrNext = (surahNumber, page) =>
    {
        this.props.history.push(`/surat/${surahNumber}/tafsir/${page}`)
    }

    playAudio = (getAudio, getButtonDataPlay, getPlayIcon, getPauseIcon) =>
    {
        const theAudio  = document.getElementById(getAudio)
        const btn       = document.getElementById(getButtonDataPlay)
        const playIcon  = document.getElementById(getPlayIcon)
        const pauseIcon = document.getElementById(getPauseIcon)
        const dataPlay  = btn.getAttribute('data-play')

        if(dataPlay === 'false')
        {
            btn.setAttribute('data-play', 'true')
            const playingAudio = theAudio.play()

            if(playingAudio !== undefined)
            {
                playingAudio.then(() =>
                {
                    playIcon.style.display = 'none'
                    pauseIcon.style.display = 'block'
                }).catch((error) => 
                {
                    console.log(error)
                })
            }
        }
        else
        {
            btn.setAttribute('data-play', 'false')
            theAudio.pause()
            playIcon.style.display = 'block'
            pauseIcon.style.display = 'none'
        }

        theAudio.onpause = () =>
        {
            btn.setAttribute('data-play', 'false')
            theAudio.pause()
            playIcon.style.display = 'block'
            pauseIcon.style.display = 'none'
        }
    }

    componentDidMount()
    {
        this.getTafsir()
    }

    componentDidUpdate()
    {
        // console.log(this.props)
    }

    render()
    {
        const surah = this.state.surah
        const ayah  = this.state.ayah
        const page  = this.state.page

        const audioId   = `surah-${surah.number}-audio-${ayah.number}`
        const buttonId  = `audio-button-${surah.number}-${ayah.number}`
        const playIcon  = `play-${surah.number}-${ayah.number}`
        const pauseIcon = `pause-${surah.number}-${ayah.number}`

        return (
            <div className="content-bg content-margin">
                <div className="tafsir-header">
                    {
                        page.prev !== null 
                        ?
                        <button className="tafsir-back" onClick={() => this.goToPrevOrNext(surah.number, page.prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144"/>
                            </svg>
                        </button>
                        :
                        <button className="tafsir-back disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144"/>
                            </svg>
                        </button>
                    }
                    
                    <div className="tafsir-title">
                        <p>Tafsir</p>
                        <h3>{surah.name}</h3>
                        <span>Ayat {ayah.number}</span>
                    </div>

                    {
                        page.next !== null
                        ?
                        <button className="tafsir-next" onClick={() => this.goToPrevOrNext(surah.number, page.next)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                            </svg>
                        </button>
                        :
                        <button className="tafsir-next disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                            </svg>
                        </button>
                    }
                    
                </div>

                <div className="ayah-card">
                    <div className="ayah-toolbar">
                        <div className="ayah-number">{ayah.number}</div>
                        
                        <div className="action-wrapper">
                            <audio id={audioId} src={ayah.audio} />
                            <button id={buttonId} className="audio-button" title="Audio Ayat/Murottal" onClick={() => this.playAudio(audioId, buttonId, playIcon, pauseIcon)} data-play="false">
                                <svg aria-hidden="true" id={playIcon} focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                                </svg>
                                <svg aria-hidden="true" id={pauseIcon} focusable="false" data-prefix="fas" data-icon="pause" className="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p className="ayah-ar">{ayah.text}</p>
                    <p className="ayah-idn">{ayah.translation}</p>
                </div>
                <div className="tafsir-card">
                    {ayah.tafsir}
                </div>
            </div>
        )
    }
}

export default Tafsir