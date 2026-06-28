<div align="center">
    <a href="https://bitquran.net" target="_blank">
        <img src="https://bitquran.net/logo192.png" alt="Logo" height="115" />
    </a>
</div>

<h1 align="center">Bitquran</h1>
<p align="center">Baca Al-Qur'an secara Daring</p>
<div align="center">
    <img src="https://img.shields.io/badge/Version-v1.2.2-green?style=for-the-badge" alt="App Version" />
</div>

## :memo: Tentang

Bitquran adalah aplikasi berbasis web yang menyajikan kitab suci Al-Qur'an secara digital dalam bentuk _website_. Dibangunnya aplikasi ini diharapkan dapat memunculkan ketertarikan untuk membaca Al-Qur'an karena dapat diakses dengan mudah.

Aplikasi ini dibangun dalam bentuk _website_ dan tidak dibangun dalam bentuk aplikasi _mobile_/ponsel alasannya adalah agar dapat digunakan tanpa harus memasang aplikasi pada perangkat, sehingga tidak memakan ruang penyimpanan yang ada. Karena berbasis web, aplikasi ini juga memungkinkan untuk diakses dari berbagai perangkat yang berbeda (_cross-platform_), entah itu dari komputer, ponsel, ataupun _tablet_. Akses langsung di [bitquran.net](https://bitquran.net).

## :hammer_and_wrench: Teknologi yang Digunakan

- [React v19](https://react.dev/) — _library_ untuk membuat _UI component_
- [TypeScript v6](https://www.typescriptlang.org/) — _superset_ JavaScript
- [Vite v8](https://vite.dev/) — _build tool_ dan _dev server_
- [TailwindCSS v4](https://tailwindcss.com/) — _framework_ CSS untuk _styling_ tampilan
- [React Router v7](https://reactrouter.com/) — _routing_ untuk navigasi/berpindah antar halaman
- [TanStack Query v5](https://tanstack.com/query) — manajemen _state_ dan _caching_ data server
- [Axios v1](https://axios-http.com/) — _HTTP client_ untuk _fetching_ data dari API
- [Vitest v4](https://vitest.dev/) — _framework_ untuk _unit testing_

## :zap: Fitur

- Cari surat berdasarkan nama
- Terjemahan bahasa Indonesia untuk tiap-tiap ayat dalam surat
- Tafsir ayat dalam bahasa Indonesia
- Audio ayat (_murottal_) untuk lebih memahami cara membaca
- Informasi mengenai jumlah ayat dalam tiap surat, terjemahan nama surat, dan tempat surat diturunkan (_Makkiyyah_ atau _Madaniyyah_)
- Sudah mendukung tampilan responsif (_mobile responsive_) untuk perangkat _mobile_ dan lain sebagainya

## :book: Sumber

Sumber data seperti ayat-ayat, terjemahan, tafsir dan _murottal_ disediakan melalui API oleh [**SutanLab**](https://github.com/sutanlab/quran-api) yang mana data-datanya dihimpun dari berbagai sumber seperti [**Kementerian Agama**](https://quran.kemenag.go.id/) untuk terjemahan dan tafsir ayat dalam bahasa Indonesia, [**Quran Cloud**](https://api.alquran.cloud/) untuk ayat-ayat, meta data ayat, dan audio _murottal_, [**Al-Quran-ID-API**](https://github.com/bachors/Al-Quran-ID-API) untuk tafsir surat dalam bahasa Indonesia.

## :mailbox: Laporkan Kesalahan/Beri Saran

Sebagaimana hasil buatan manusia pada umumnya, aplikasi ini pun memiliki kekurangan dan mungkin terdapat kesalahan teknis yang terlewat dalam proses pengembangannya. Tentunya Al Qur'an-nya itu sendiri telah diturunkan dengan sempurna sebagai penyempurna dari kitab-kitab sebelumnya. Sehingga bentuk kesalahan yang terdapat pada aplikasi ini murni disebabkan karena kelalaian dalam proses pengembangan atau kecacatan pada desain sistem. Oleh karena itu, bila menemukan kesalahan/_bug_ seperti misalnya audio _murottal_ tertukar antara ayat satu dengan yang lain atau tidak bisa diputar, terjemahan terpotong, dan lain sebagainya mohon sampaikan via surel di info@bitquran.net. Namun selain itu, bila ada saran yang ingin diberikan untuk aplikasi ini silakan sampaikan juga melalui surel yang sama.

## :rocket: Riwayat Pembaruan pada Aplikasi

Untuk melihat informasi mengenai pembaruan atau perubahan pada versi aplikasi ini harap merujuk dokumen `CHANGELOG.md` atau langsung klik [di sini](CHANGELOG.md).

## :pencil2: Author

Project ini dibuat oleh Ahmad Rivaldy S - <a href="https://rivaldy.net" target="_blank">Kunjungi Situs</a>
