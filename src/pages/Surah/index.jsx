import React, { Component } from 'react'
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
            // console.log('Ini suratnya: ', result)
            this.setState({
                ayahList: result.ayat
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
            <div className="content surah-list-wrapper">
                {
                    this.state.ayahList.map(ayah =>
                    {
                        return <p key={ayah.id}>{ayah.ar}</p>
                    })
                }
            </div>
        )
    }
}

export default Surah
