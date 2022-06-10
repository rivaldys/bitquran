import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AyahCard } from '../../components'
import QuranAPI from '../../services'
import { setPageTitle } from '../../utils'
import './index.css'

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

    getTafsir = (surahNumber, page) =>
    {
        let id     = surahNumber == null ? this.props.match.params.id : surahNumber
        let ayahId = page == null ? this.props.match.params.tafsirId : page

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
        this.getTafsir(surahNumber, page)
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

    handlePickTafsir = (e) =>
    {
        const tafsirId     = e.target.selectedIndex
        const el           = e.target.childNodes[tafsirId]
        const tafsirTarget = el.value
        const tafsirSurah  = el.getAttribute('surah')

        if(tafsirTarget !== 'empty')
        {
            this.goToPrevOrNext(tafsirSurah, tafsirTarget)
        }
    }

    ToTopOnLoad = () =>
    {
        window.scrollTo({ top: 0 })
    }

    componentDidMount()
    {
        const surahNumber = null
        const page = null

        this.getTafsir(surahNumber, page)
        this.ToTopOnLoad()
    }

    componentDidUpdate()
    {
        document.title = setPageTitle(`Tafsir ${this.state.surah.name} Ayat ${this.state.ayah.number}`, 'Bitquran')
    }

    componentWillUnmount()
    {
        document.title = setPageTitle('Bitquran', 'Baca Al-Qur\'an secara Daring')
    }

    render()
    {
        const surah = this.state.surah
        const ayah  = this.state.ayah
        const page  = this.state.page
        const tafsirList = []

        for(let i=1; i <= surah.numberOfAyahs; i++)
        {
            tafsirList.push(i)
        }

        return (
            <div className="content-bg content-margin">
                {/* Tafsir Header */}
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

                <div className="pick-tafsir">
                    <select name="pick-tafsir" id="pick-tafsir" onChange={this.handlePickTafsir}>
                        <option value="" target="empty">-Lompat ke Tafsir Lain-</option>
                        {
                            tafsirList.map(tafsir =>
                            {
                                return <option key={tafsir} surah={surah.number} value={tafsir}>Tafsir {tafsir}</option>
                            })
                        }
                    </select>
                </div>

                <Link to={`/surat/${surah.number}`} className="tafsir-link">&larr; Kembali ke Surat</Link>

                {/* Ayah */}
                <AyahCard
                    key={ayah.number}
                    surahNumber={surah.number}
                    ayahNumber={ayah.number}
                    ayahAudio={ayah.audio}
                    ayah={ayah.text}
                    ayahTranslation={ayah.translation}
                    getPlay={this.playAudio}
                    isSurahPage="no"
                />
                
                {/* Tafsir */}
                <div className="tafsir-card">
                    {ayah.tafsir}
                </div>
            </div>
        )
    }
}

export default Tafsir