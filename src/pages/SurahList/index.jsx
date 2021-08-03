import React, { Component } from 'react'
import { SurahCard } from '../../components'
import QuranAPI from '../../services'
import './index.css'

class SurahList extends Component
{
    state =
    {
        surahList: []
    }

    getSurahList = () =>
    {
        QuranAPI.getSurahList().then(result =>
        {
            // console.log('Data: ', result.data)
            this.setState({
                surahList: result.data
            })
        })
    }

    handleDetail = (id) =>
    {
        this.props.history.push(`/surat/${id}`)
    }

    componentDidMount()
    {
        this.getSurahList()
    }

    render()
    {
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
                <div className="content">
                    {
                        this.state.surahList.map(surah =>
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