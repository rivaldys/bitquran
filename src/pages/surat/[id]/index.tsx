import { PageContentLayout, Select, VerseItem } from 'bitquran/components'
import { ILQuran } from 'bitquran/images'
import type { SurahProps } from 'bitquran/shared/types'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

export async function getServerSideProps(context: GetServerSidePropsContext)
{
    const { id } = context.query

    try {
        const res = await fetch(`${process.env.API_URL}/surah/${id}`)
        if(!res.ok) throw new Error(`Failed to fetch surah number ${id}.`)

        const surah = await res.json()

        return { props: { surah } }
    }
    catch(error: unknown) {
        return {
            props: {
                error: error instanceof Error ? error.message : 'An unknown error occurred',
            }
        }
    }
}

export default function SurahDetail({ surah }: SurahProps)
{
    const { name, number, numberOfVerses, revelation, verses } = surah.data
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{name.transliteration.id} &#8211; Bitquran</title>
            </Head>

            <div className="relative min-h-[300px] rounded-[10px] [background-image:linear-gradient(150deg,_#c5e1a5,_#009688)] shadow-[10px_25px_30px_rgba(117,117,117,0.45)] mb-[50px]">
                <div
                    className="absolute w-full h-full rounded-[10px] opacity-35 [background-position:bottom_-50px_right_50px] bg-no-repeat [background-size:35%]"
                    style={{ backgroundImage: `url(${ILQuran.src})` }}
                />
                <div className="w-full h-full flex items-center justify-center flex-col box-border m-auto p-[15px] absolute [&>*]:text-white">
                    <p className="text-[28px] leading-[35px] mb-[10px] font-saleem-quran">{name.long}</p>
                    <h1 className="text-[28px] leading-[35px] font-medium">{name.transliteration.id}</h1>
                    <p className="text-[18px] leading-[25px]">{name.translation.id}</p>
                    <hr className="w-full h-[1px] my-[15px] border-0 [background-image:linear-gradient(90deg,_transparent,_#ffffff,_transparent)]" />
                    <p className="text-[16px] leading-[23px] font-light">{revelation.id} · {numberOfVerses} Ayat</p>
                </div>
            </div>

            <Select className="mb-[30px]">
                <Select.Option>-Pilih Ayat-</Select.Option>
                {Array.from({ length: numberOfVerses }).map((_, index) => (
                    <Select.Option key={`select-${index+1}`}>Ayat {index+1}</Select.Option>
                ))}
            </Select>

            <PageContentLayout className="!p-[15px]">
                {verses &&
                    verses.map((verse, index) => (
                        <VerseItem
                            className={index+1 == verses?.length ? '' : 'mb-[35px]'}
                            toolbar={{
                                number: verse.number.inSurah,
                                audioButton: {
                                    src: verse.audio.primary,
                                    onClick: () => alert('Audio diputar'),
                                    title: 'Putar audio ayat/murottal'
                                },
                                docButton: {
                                    onClick: () => router.push(`/surat/${number}/tafsir/${verse.number.inSurah}`),
                                    title: 'Tampilkan tafsir ayat'
                                }
                            }}
                            verse={{
                                ar: verse.text.arab,
                                id: verse.translation.id
                            }}
                            disableBottomSepartor={index+1 == verses?.length}
                            key={`surat-${index+1}`}
                        />
                    ))}
            </PageContentLayout>
        </>
    )
}
