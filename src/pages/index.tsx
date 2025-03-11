import { SurahsProps } from 'bitquran/types'
import Surah from './surat'

export async function getServerSideProps()
{
    try {
        const res = await fetch(`${process.env.API_URL}/surah`)
        if(!res.ok) throw new Error('Failed to fetch surah list.')

        const surahs = await res.json()

        return { props: { surahs } }
    }
    catch(error: unknown) {
        return {
            props: {
                error: error instanceof Error ? error.message : 'An unknown error occurred',
            }
        }
    }
}

export default function Main({ surahs }: SurahsProps)
{
    return <Surah surahs={surahs} />
}