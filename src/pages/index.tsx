import { SurahProps } from 'bitquran/types'
import Surah from './surat'

export async function getServerSideProps()
{
    try {
        const res = await fetch(`${process.env.API_URL}/surah`)
        if(!res.ok) throw new Error('Failed to fetch data')

        const surahs = await res.json()

        return { props: { surahs } }
    }
    catch(error: any) {
        return { props: { error: error.message } }
    }
}

export default function Main({ surahs }: SurahProps)
{
    return <Surah surahs={surahs} />
}