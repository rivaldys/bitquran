import React, { Component } from 'react'
import { setPageTitle } from '../../utils'
import './index.css'

class About extends Component
{
    ToTopOnLoad = () =>
    {
        window.scrollTo({ top: 0 })
    }

    componentDidMount()
    {
        document.title = setPageTitle('Tentang', 'Bitquran')
        this.ToTopOnLoad()
    }

    componentWillUnmount()
    {
        document.title = setPageTitle('Bitquran', 'Baca Al-Qur\'an secara Daring')
    }

    render()
    {
        return (
            <div className="content-bg content-margin">
                <div className="card-about">
                    <h3>Tentang</h3>
                    <p>
                        Bitquran adalah aplikasi berbasis web yang menyajikan kitab suci Al-Qur'an
                        secara digital dalam bentuk website. Dibangunnya aplikasi ini diharapkan dapat memunculkan
                        ketertarikan untuk membaca Al-Qur'an karena dapat diakses dengan mudah.
                    </p>
                    <p>
                        Aplikasi ini dibangun dalam bentuk website dan tidak dibangun dalam bentuk aplikasi <i>mobile</i>/ponsel
                        alasannya adalah agar dapat digunakan tanpa harus memasang aplikasi pada perangkat,
                        sehingga tidak memakan ruang penyimpanan yang ada. Karena berbasis web, aplikasi ini juga memungkinkan
                        untuk diakses dari berbagai perangkat yang berbeda (<i>cross-platform</i>), entah itu dari komputer, ponsel, ataupun tablet.
                    </p>
                </div>

                <div className="card-about">
                    <h3>Sumber</h3>
                    <p>
                        Sumber data seperti ayat-ayat, terjemahan, tafsir dan <i>murottal</i> disediakan melalui API oleh <a href="https://github.com/sutanlab/quran-api" target="_blank" rel="noreferrer"><b>SutanLab</b></a> yang mana
                        data-datanya dihimpun dari berbagai sumber seperti <a href="https://quran.kemenag.go.id/" target="_blank" rel="noreferrer"><b>Kementerian Agama</b></a> untuk terjemahan dan tafsir ayat dalam bahasa Indonesia,
                        <a href="https://api.alquran.cloud/" target="_blank" rel="noreferrer"><b> Quran Cloud</b></a> untuk ayat-ayat, meta data ayat, dan audio <i>murottal</i>, <a href="https://github.com/bachors/Al-Quran-ID-API" target="_blank" rel="noreferrer"><b>Al-Quran-ID-API</b></a> untuk tafsir surat dalam bahasa Indonesia.
                    </p>
                </div>

                <div className="card-about">
                    <h3>Laporkan Kesalahan/Beri Saran</h3>
                    <p>
                        Sebagaimana hasil buatan manusia pada umumnya, aplikasi ini pun memiliki kekurangan dan mungkin terdapat kesalahan teknis
                        yang terlewat dalam proses pengembangannya. Tentunya Al Qur'an-nya itu sendiri telah diturunkan dengan sempurna
                        sebagai penyempurna dari kitab-kitab sebelumnya. Sehingga bentuk kesalahan yang terdapat pada aplikasi ini murni
                        disebabkan karena kelalaian dalam proses pengembangan atau kecacatan pada desain sistem. Oleh karena itu,
                        bila menemukan kesalahan/<i>bug</i> seperti misalnya audio <i>murottal</i> tertukar antara
                        ayat satu dengan yang lain atau tidak bisa diputar, terjemahan terpotong, dan lain sebagainya mohon sampaikan via surel di <b>hi@rivaldy.net</b>.
                        Namun selain itu, bila ada saran yang ingin diberikan untuk aplikasi ini silakan sampaikan
                        juga melalui surel yang sama.
                    </p>
                </div>
            </div>
        )
    }
}

export default About