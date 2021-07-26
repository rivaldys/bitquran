import React, { Component } from 'react'
import { AyahCard } from '../../components'
import QuranAPI from '../../services'

export class Surah extends Component
{
    state =
    {
        ayahList: []
    }

    getSurah = () =>
    {
        let id = this.props.match.params.id

        QuranAPI.getSurah(id).then(result =>
        {
            // console.log('Ini suratnya: ', result.data)
            this.setState({
                ayahList: result.data.verses
            })
        })
    }
    
    componentDidMount()
    {
        this.getSurah()
    }
    
    render()
    {
        return (
            <>
                <div className="header-background">
                    <div className="header-illustration">
                        <div className="header-text">
                            <h1>Daftar Surat dalam Al-Qur'an</h1>
                            <p>Nama Surat</p>
                        </div>
                    </div>
                </div>
                <div className="content content-bg">
                    {
                        this.state.ayahList.map(ayah =>
                        {
                            return <AyahCard key={ayah.number.inSurah} ayah={ayah} />
                        })
                    }
                </div>
            </>
        )
    }
}

export default Surah
