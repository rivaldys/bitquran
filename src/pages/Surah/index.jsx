import React, { Component } from 'react'
import { AyahCard } from '../../components'
import QuranAPI from '../../services'
import './index.css'

class Surah extends Component
{
    state =
    {
        number: 0,
        name: '',
        nameAr: '',
        nameTranslation: '',
        numberOfAyahs: 0,
        revelation: '',
        preBismillah:
        {
            text: '',
            audio: ''
        },
        ayahList: []
    }

    getSurah = () =>
    {
        let id = this.props.match.params.id

        QuranAPI.getSurah(id).then(result =>
        {
            let data              = result.data
            let preBismillah      = data.preBismillah == null ? '' : data.preBismillah.text.arab
            let preBismillahAudio = data.preBismillah == null ? '' : data.preBismillah.audio.primary

            this.setState({
                number: data.number,
                name: data.name.transliteration.id,
                nameAr: data.name.long,
                nameTranslation: data.name.translation.id,
                numberOfAyahs: data.numberOfVerses,
                revelation: data.revelation.id,
                preBismillah:
                {
                    text: preBismillah,
                    audio: preBismillahAudio
                },
                ayahList: data.verses
            })
        })
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

    handlePickAyah = (e) =>
    {
        const menubarHeight = document.querySelector('.menubar-wrapper').scrollHeight
        const ayahId        = e.target.selectedIndex
        const el            = e.target.childNodes[ayahId]
        const ayahTarget    = el.getAttribute('target')

        if(ayahTarget !== 'empty')
        {
            const sectionContent = document.getElementById(ayahTarget).offsetTop - (menubarHeight + 35)
            window.scrollTo({ top: sectionContent, behavior: 'smooth' })
        }
    }

    ToTopOnLoad = () =>
    {
        window.scrollTo({ top: 0 })
    }
    
    componentDidMount()
    {
        this.getSurah()
        this.ToTopOnLoad()
    }

    componentDidUpdate()
    {
        document.title = `${this.state.name} – Bitquran`
    }

    componentWillUnmount()
    {
        document.title = 'Bitquran – Baca Al-Qur\'an secara Daring'
    }
    
    render()
    {
        const surah = this.state

        return (
            <>
                <div className="surah-header-background">
                    <div className="surah-header-illustration"></div>
                    <div className="surah-header-text">
                        <p className="arabic-name">{surah.nameAr}</p>
                        <h1>{surah.name}</h1>
                        <p>{surah.nameTranslation}</p>
                        <hr />
                        <h5>{surah.revelation} &middot; {surah.numberOfAyahs} Ayat</h5>
                        {
                            surah.preBismillah.text !== ''
                            ?
                                <div className="pre-bismillah-wrapper">
                                    <audio id="pre-bismillah-audio" src={surah.preBismillah.audio} />
                                    <button id="btn-playback" className="pre-bismillah-btn-play" onClick={() => this.playAudio('pre-bismillah-audio', 'btn-playback', 'fa-play', 'fa-pause')} data-play="false">
                                        <svg aria-hidden="true" id="fa-play" focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                                        </svg>
                                        <svg aria-hidden="true" id="fa-pause" focusable="false" data-prefix="fas" data-icon="pause" className="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">'
                                            <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>'
                                        </svg>
                                    </button>
                                    <p className="pre-bismillah">{surah.preBismillah.text}</p>
                                </div>
                            : ''
                        }
                    </div>
                </div>
                <div className="pick-ayah">
                    <select name="pick-ayah" id="pick-ayah" onChange={this.handlePickAyah}>
                        <option value="" target="empty">-Pilih Ayat-</option>
                        {
                            surah.ayahList.map(ayah =>
                            {
                                return <option
                                            key={ayah.number.inSurah}
                                            value={ayah.number.inSurah}
                                            target={`${surah.number}-${ayah.number.inSurah}`}
                                        >
                                            Ayat {ayah.number.inSurah}
                                        </option>
                            })
                        }
                    </select>
                </div>
                <div className="content-bg">
                    {
                        surah.ayahList.map(ayah =>
                        {
                            return <AyahCard
                                        key={ayah.number.inSurah}
                                        surahNumber={surah.number}
                                        ayahNumber={ayah.number.inSurah}
                                        ayahAudio={ayah.audio.primary}
                                        ayah={ayah.text.arab}
                                        ayahTranslation={ayah.translation.id}
                                        getPlay={this.playAudio}
                                        isSurahPage="yes"
                                    />
                        })
                    }
                </div>
            </>
        )
    }
}

export default Surah
