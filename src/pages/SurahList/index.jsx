import React, { Component } from 'react'
import { Input, SurahCard } from '../../components'
import QuranAPI from '../../services'
import './index.css'

class SurahList extends Component
{
    state =
    {
        surahList: [],
        surahListFilter: []
    }

    getSurahList = () =>
    {
        QuranAPI.getSurahList().then(result =>
        {
            this.setState({
                surahList: result.data,
                surahListFilter: result.data
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
        const surahListFilter = this.state.surahListFilter
        const search          = e.target.value.toLowerCase()
        const regex           = new RegExp(search, 'g')

        const surahFiltered = surahListFilter.filter(surah =>
        {
            const surahName = surah.name.transliteration.id.toLowerCase()

            if(surahName.match(regex)) return surah
            return false
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
        const { surahList } = this.state

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

                <div className="search-bar">
                    <Input type="text" name="search" placeholder="Cari nama surat" onChange={this.handleSearch} />
                </div>

                <div className="content">
                    {
                        surahList.map(surah =>
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