import React, { Component } from 'react'
import { SurahCard } from '../../components'
import QuranAPI from '../../services'
import './index.css'

class SurahList extends Component
{
    state =
    {
        surahList: [],
        search: ''
    }

    getSurahList = () =>
    {
        QuranAPI.getSurahList().then(result =>
        {
            this.setState({
                surahList: result.data
            })
        })
    }

    handleDetail = (id) =>
    {
        this.props.history.push(`/surat/${id}`)
    }

    handlePickSurah = (e) =>
    {
        const menubarHeight = document.querySelector('.menubar-wrapper').scrollHeight
        const surahId       = e.target.selectedIndex
        const el            = e.target.childNodes[surahId]
        const surahTarget   = el.getAttribute('target')

        if(surahTarget !== 'empty')
        {
            const sectionContent = document.getElementById(surahTarget).offsetTop - (menubarHeight + 15)
            window.scrollTo({ top: sectionContent, behavior: 'smooth' })
        }
    }

    handleSearch = (e) =>
    {
        const name = e.target.name

        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    submitSearch = () =>
    {
        const search    = this.state.search.toLowerCase()
        const surahList = this.state.surahList
        const regex     = new RegExp(search, 'g')

        const surahFiltered = surahList.filter(surah =>
        {
            const surahName = surah.name.transliteration.id.toLowerCase()

            if(surahName.match(regex)) return surah
        })

        this.setState({
            surahList: surahFiltered
        })
    }

    ToTopOnLoad = () =>
    {
        window.scrollTo({ top: 0 })
    }

    componentDidMount()
    {
        this.getSurahList()
        this.ToTopOnLoad()
    }

    render()
    {
        const surah = this.state

        console.log('Daftar Surat:', surah)

        return (
            <>
                <div className="header-background">
                    <div className="header-illustration">
                        <div className="header-text">
                            <h1>Daftar Surat dalam Al-Qur'an</h1>
                            <p>114 Surat &middot; Makkiyah &middot; Madaniyah</p>
                        </div>
                    </div>
                </div>

                <div className="pick-surah">
                    <select name="pick-surah" id="pick-surah" onChange={this.handlePickSurah}>
                        <option value="" target="empty">-Pilih Surat-</option>
                        {
                            surah.surahList.map(surah =>
                            {
                                return <option
                                            key={surah.number}
                                            value={surah.number}
                                            target={`surat-${surah.number}`}
                                        >
                                            Surat {surah.number}
                                        </option>
                            })
                        }
                    </select>
                </div>

                <input type="text" name="search" onChange={this.handleSearch} />
                <button onClick={this.submitSearch}>Search</button>

                <div className="content">
                    {
                        surah.surahList.map(surah =>
                        {
                            return <SurahCard 
                                        key={surah.number}
                                        number={surah.number}
                                        name={surah.name.transliteration.id}
                                        nameAr={surah.name.short}
                                        nameTranslation={surah.name.translation.id}
                                        detail={this.handleDetail}
                                    />
                        })
                    }
                </div>
            </>
        )
    }
}

export default SurahList