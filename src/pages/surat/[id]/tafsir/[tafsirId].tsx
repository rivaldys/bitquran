import { PageContentLayout, Select, TextLink, VerseItem } from 'bitquran/components'
import { SurahTafsirProps } from 'bitquran/types'
import { cva } from 'class-variance-authority'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export async function getServerSideProps(context: GetServerSidePropsContext)
{
    const { id, tafsirId } = context.query

    try {
        const res = await fetch(`${process.env.API_URL}/surah/${id}/${tafsirId}`)
        if(!res.ok) throw new Error(`Failed to fetch ayah ${tafsirId} of surah number ${id}.`)

        const verse = await res.json()

        return { props: { verse } }
    }
    catch(error: unknown) {
        return {
            props: {
                error: error instanceof Error ? error.message : 'An unknown error occurred',
            }
        }
    }
}

const buttonIconStyle = cva('flex justify-center items-center w-[35px] h-[35px] border-none rounded-[5px] bg-[#e0f2f1] [&>svg]:w-[25px] stroke-[#80cbc4] fill-none transition duration-300')

export default function SurahTafsir({ verse }: SurahTafsirProps)
{
    return (
        <>
            <Head>
                <title>Tafsir {verse.data.surah?.name.transliteration.id} Ayat {verse.data.number.inSurah} &#8211; Bitquran</title>
            </Head>

            <PageContentLayout className="!p-[15px]">
                <div className="flex justify-between items-center pb-[15px] mb-[15px] border-b-[1px] border-b-[#dedede]">
                    <button className={buttonIconStyle()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ionicon"
                            viewBox="0 0 512 512"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M328 112L184 256l144 144"
                            />
                        </svg>
                    </button>

                    <div className="text-center text-[20px] leading-[23px] font-normal">
                        <p className="leading-[27px]">Tafsir</p>
                        <h3 className="leading-[27px]">{verse.data.surah?.name.transliteration.id}</h3>
                        <span className="text-[16px] font-light">Ayat {verse.data.number.inSurah}</span>
                    </div>

                    <button className={buttonIconStyle()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ionicon"
                            viewBox="0 0 512 512"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M184 112l144 144-144 144" />
                        </svg>
                    </button>
                </div>

                <div className="w-full flex justify-center mb-[15px]">
                    <Select className="!w-[250px] text-[14px] leading-[21px] box-border">
                        <Select.Option>-Lompat ke Tafsir Lain-</Select.Option>
                        {Array.from({ length: verse.data.surah ? verse.data.surah.numberOfVerses : 0 }).map((_, index) => (
                            <Select.Option key={`select-${index+1}`}>Tafsir {index+1}</Select.Option>
                        ))}
                    </Select>
                </div>

                <TextLink className="inline-block text-[#80cbc4] text-[14px] leading-[21px] mb-[15px] hover:opacity-100 hover:underline" href="/">&larr; Kembali ke Surat</TextLink>
                
                <VerseItem
                    className="mb-[35px]"
                    toolbar={{
                        number: 1,
                        audioButton: {
                            src: verse.data.audio.primary,
                            onClick: () => alert('Audio diputar'),
                            title: 'Putar audio ayat/murottal'
                        }
                    }}
                    verse={{
                        ar: verse.data.text.arab,
                        id: verse.data.translation.id
                    }}
                />

                <p className="rounded-[7px] bg-[#f7f7f7] leading-[26px] p-[15px] mb-[15px]">
                    {verse.data.tafsir.id.long}
                </p>
            </PageContentLayout>
        </>
    )
}