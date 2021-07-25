import React, { Component } from 'react'
import { SurahCard } from '../../components'
import QuranAPI from '../../services'

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
            this.setState({
                surahList: result
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
            <div>
                <div className="header-background">
                    <div className="header-illustration">
                        <h1>Daftar Surat dalam Al-Qur'an</h1>
                    </div>
                </div>
                <div className="content surah-list-wrapper">
                    {
                        this.state.surahList.map(surah =>
                        {
                            return <SurahCard key={surah.nomor} data={surah} detail={this.handleDetail} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default SurahList