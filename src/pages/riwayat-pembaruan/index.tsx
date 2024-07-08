import { ContentSection, PageContentLayout, SectionTitle, Text, TextLabel } from 'bitquran/components'
import Head from 'next/head'

export default function ChangeLog()
{
    return (
        <>
            <Head>
                <title>Riwayat Pembaruan &#8211; Bitquran</title>
            </Head>
            
            <PageContentLayout>
                <ContentSection>
                    <SectionTitle>Riwayat Pembaruan</SectionTitle>
                    <TextLabel>Versi 1.1.1</TextLabel>
                    <ul className="pl-[30px] list-disc">
                        <li>Mengubah <i>endpoint API</i>.</li>
                        <li>Menambahkan gambar pratinjau (<i>preview image</i>) ketika <i>link</i> situs ini dibagikan di media sosial.</li>
                        <li>Tahun <i>copyright</i> dinamis sesuai tahun berjalan.</li>
                    </ul>
                </ContentSection>

                <ContentSection>
                    <TextLabel>Versi 1.1.0</TextLabel>
                    <ul className="pl-[30px] list-disc">
                        <li>Menubar pada versi <i>mobile</i> dipindahkan menjadi <i>sidebar menu</i> yang dapat dimunculkan dengan mengklik tombol menu yang ada di sudut kanan layar.</li>
                        <li>Menambahkan fitur pencarian surat pada laman beranda.</li>
                    </ul>
                </ContentSection>

                <ContentSection className="!border-b-0">
                    <TextLabel>Versi 1.0.0</TextLabel>
                    <ul className="pl-[30px] list-disc">
                        <li>Rilis awal</li>
                    </ul>
                </ContentSection>
            </PageContentLayout>
        </>
    )
}