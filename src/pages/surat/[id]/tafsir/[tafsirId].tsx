import { PageContentLayout, Select, TextLink, VerseItem } from 'bitquran/components'
import { cva } from 'class-variance-authority'
import Head from 'next/head'

const buttonIconStyle = cva('flex justify-center items-center w-[35px] h-[35px] border-none rounded-[5px] bg-[#e0f2f1] [&>svg]:w-[25px] stroke-[#80cbc4] fill-none transition duration-300')

export default function SurahTafsir()
{
    return (
        <>
            <Head>
                <title>Tafsir Surat &#8211; Bitquran</title>
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

                    <div className="text-center text-[20px] leading-[27px] font-normal">
                        <p>Tafsir</p>
                        <h3>Nama Surat</h3>
                        <span className="text-[16px] leading-[23px] font-light">Ayat 1</span>
                    </div>

                    <button className={buttonIconStyle()}>Tes</button>
                </div>

                <div className="w-full flex justify-center mb-[15px]">
                    <Select className="!w-[250px] text-[14px] leading-[21px] box-border">
                        <Select.Option>-Lompat ke Tafsir Lain-</Select.Option>
                        <Select.Option>1</Select.Option>
                        <Select.Option>2</Select.Option>
                    </Select>
                </div>

                <TextLink className="inline-block text-[#80cbc4] text-[14px] leading-[21px] mb-[15px] hover:opacity-100 hover:underline" href="/">&larr; Kembali ke Surat</TextLink>
                
                <VerseItem
                    className="mb-[35px]"
                    toolbar={{
                        number: 1,
                        audioButton: {
                            src: '',
                            onClick: () => alert('Audio diputar'),
                            title: 'Putar audio ayat/murottal'
                        }
                    }}
                    verse={{
                        ar: 'adasdas',
                        id: 'asdasdsa'
                    }}
                />

                <p className="rounded-[7px] bg-[#f7f7f7] leading-[26px] p-[15px] mb-[15px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi dignissimos vero eaque doloribus porro officia laborum non illum eligendi? Nihil, maiores? In, perspiciatis. Aut architecto incidunt molestiae ullam inventore aliquam!
                </p>
            </PageContentLayout>
        </>
    )
}