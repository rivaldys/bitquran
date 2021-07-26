import Get from './Get'

// Get All Surahs
const getSurahList = () => Get('surah')

// Get Specific Surah
const getSurah = (id) => Get(`surah/${id}`)

const QuranAPI = 
{
    getSurahList,
    getSurah
}

export default QuranAPI