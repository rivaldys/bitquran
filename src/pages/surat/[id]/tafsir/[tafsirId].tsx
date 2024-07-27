import { PageContentLayout, VerseItem } from 'bitquran/components'
import Head from 'next/head'

export default function SurahTafsir()
{
    return (
        <>
            <Head>
                <title>Tafsir Surat &#8211; Bitquran</title>
            </Head>

            <PageContentLayout className="!p-[15px]">
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
            </PageContentLayout>
        </>
    )
}