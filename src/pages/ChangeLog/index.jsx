import React, { Component } from 'react'
import { setPageTitle } from '../../utils'
import './index.css'

class ChangeLog extends Component
{
    ToTopOnLoad = () =>
    {
        window.scrollTo({ top: 0 })
    }

    componentDidMount()
    {
        document.title = setPageTitle('Riwayat Pembaruan', 'Bitquran')
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
                    <h3>Riwayat Pembaruan</h3>
                    <p className="label">Versi 1.1.2</p>
                    <ul>
                        <li>Menambahkan konfigurasi <i>base url/public url</i>.</li>
                    </ul>
                </div>

                <div className="card-about">
                    <p className="label">Versi 1.1.1</p>
                    <ul>
                        <li>Mengubah <i>endpoint API</i>.</li>
                        <li>Menambahkan gambar pratinjau (<i>preview image</i>) ketika <i>link</i> situs ini dibagikan di media sosial.</li>
                        <li>Tahun <i>copyright</i> dinamis sesuai tahun berjalan.</li>
                    </ul>
                </div>

                <div className="card-about">
                    <p className="label">Versi 1.1.0</p>
                    <ul>
                        <li>
                            Menubar pada versi <i>mobile</i> dipindahkan menjadi <i>sidebar menu</i> yang dapat dimunculkan dengan
                            mengklik tombol menu yang ada di sudut kanan layar.
                        </li>
                        <li>Menambahkan fitur pencarian surat pada laman beranda.</li>
                    </ul>
                </div>

                <div className="card-about">
                    <p className="label">Versi 1.0.0</p>
                    <ul>
                        <li>Rilis awal</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ChangeLog