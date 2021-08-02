import Get from './Get'

// Get All Surahs
const getSurahList = () => Get('surah')

// Get Specific Surah
const getSurah = (id) => Get(`surah/${id}`)

// Get Specific Ayah
const getAyah = (id, ayahId) => Get(`surah/${id}/${ayahId}`)

const QuranAPI = 
{
    getSurahList,
    getSurah,
    getAyah
}

export default QuranAPI