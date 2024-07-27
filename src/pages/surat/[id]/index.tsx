import { PageContentLayout, Select, VerseItem } from 'bitquran/components'
import { ILQuran } from 'bitquran/images'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SurahDetail()
{
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Nama Surat &#8211; Bitquran</title>
            </Head>

            <div className="relative min-h-[300px] rounded-[10px] [background-image:linear-gradient(150deg,_#c5e1a5,_#009688)] shadow-[10px_25px_30px_rgba(117,117,117,0.45)] mb-[50px]">
                <div
                    className="absolute w-full h-full rounded-[10px] opacity-35 [background-position:bottom_-50px_right_50px] bg-no-repeat [background-size:35%]"
                    style={{ backgroundImage: `url(${ILQuran.src})` }}
                />
                <div className="w-full h-full flex items-center justify-center flex-col box-border m-auto p-[15px] absolute [&>*]:text-white">
                    <p className="text-[28px] leading-[35px] mb-[10px] font-saleem-quran">Arabic</p>
                    <h1 className="text-[28px] leading-[35px] font-medium">Surah Name</h1>
                    <p className="text-[18px] leading-[25px]">Subtitle</p>
                    <hr className="w-full h-[1px] my-[15px] border-0 [background-image:linear-gradient(90deg,_transparent,_#ffffff,_transparent)]" />
                    <p className="text-[16px] leading-[23px] font-light">114 Surat · Makkiyah · Madaniyah</p>
                </div>
            </div>

            <Select className="mb-[30px]">
                <Select.Option>-Pilih Ayat-</Select.Option>
                <Select.Option>1</Select.Option>
                <Select.Option>2</Select.Option>
            </Select>

            <PageContentLayout className="!p-[15px]">
                <VerseItem
                    className="mb-[35px]"
                    toolbar={{
                        number: 1,
                        audioButton: {
                            src: '',
                            onClick: () => alert('Audio diputar'),
                            title: 'Putar audio ayat/murottal'
                        },
                        docButton: {
                            onClick: () => router.push('/surat/1/tafsir/1'),
                            title: 'Tampilkan tafsir ayat'
                        }
                    }}
                    verse={{
                        ar: 'adasdas',
                        id: 'asdasdsa'
                    }}
                />
            </PageContentLayout>
        </>
    )
}
