import { ContentSection, PageContentLayout, SectionTitle, Text, TextLink } from 'bitquran/components'
import Head from 'next/head'

export default function About()
{
    return (
        <>
            <Head>
                <title>Tentang &#8211; Bitquran</title>
            </Head>

            <PageContentLayout>
                <ContentSection>
                    <SectionTitle>Tentang</SectionTitle>
                    <Text>
                        Bitquran adalah aplikasi berbasis web yang menyajikan kitab suci Al-Qur'an secara digital dalam bentuk website. Dibangunnya aplikasi ini diharapkan dapat memunculkan ketertarikan untuk membaca Al-Qur'an karena dapat diakses dengan mudah.
                    </Text>
                    <Text>
                        Aplikasi ini dibangun dalam bentuk <i>website</i> dan tidak dibangun dalam bentuk aplikasi <i>mobile</i>/ponsel alasannya adalah agar dapat digunakan tanpa harus memasang aplikasi pada perangkat, sehingga tidak memakan ruang penyimpanan yang ada. Karena berbasis web, aplikasi ini juga memungkinkan untuk diakses dari berbagai perangkat yang berbeda (<i>cross-platform</i>), entah itu dari komputer, ponsel, ataupun <i>tablet</i>.
                    </Text>
                </ContentSection>

                <ContentSection>
                    <SectionTitle>Sumber</SectionTitle>
                    <Text>
                        Sumber data seperti ayat-ayat, terjemahan, tafsir dan <i>murottal</i> disediakan melalui API oleh <TextLink href="https://github.com/sutanlab/quran-api" target="_blank" rel="noreferrer"><b>SutanLab</b></TextLink> yang mana data-datanya dihimpun dari berbagai sumber seperti <TextLink href="https://quran.kemenag.go.id/" target="_blank" rel="noreferrer"><b>Kementerian Agama</b></TextLink> untuk terjemahan dan tafsir ayat dalam bahasa Indonesia,<TextLink href="https://api.alquran.cloud/" target="_blank" rel="noreferrer"><b> Quran Cloud</b></TextLink> untuk ayat-ayat, meta data ayat, dan audio <i>murottal</i>, <TextLink href="https://github.com/bachors/Al-Quran-ID-API" target="_blank" rel="noreferrer"><b>Al-Quran-ID-API</b></TextLink> untuk tafsir surat dalam bahasa Indonesia.
                    </Text>
                </ContentSection>

                <ContentSection className="!border-b-0 !mb-0">
                    <SectionTitle>Laporkan Kesalahan/Beri Saran</SectionTitle>
                    <Text>
                        Sebagaimana hasil buatan manusia pada umumnya, aplikasi ini pun memiliki kekurangan dan mungkin terdapat kesalahan teknis yang terlewat dalam proses pengembangannya. Tentunya Al Qur'an-nya itu sendiri telah diturunkan dengan sempurna sebagai penyempurna dari kitab-kitab sebelumnya. Sehingga bentuk kesalahan yang terdapat pada aplikasi ini murni disebabkan karena kelalaian dalam proses pengembangan atau kecacatan pada desain sistem. Oleh karena itu, bila menemukan kesalahan/<i>bug</i> seperti misalnya audio <i>murottal</i> tertukar antara ayat satu dengan yang lain atau tidak bisa diputar, terjemahan terpotong, dan lain sebagainya mohon sampaikan via surel di <TextLink href="mailto:hi@rivaldy.net"><b>hi@rivaldy.net</b></TextLink>. Namun selain itu, bila ada saran yang ingin diberikan untuk aplikasi ini silakan sampaikan juga melalui surel yang sama.
                    </Text>
                </ContentSection>
            </PageContentLayout>
        </>
    )
}