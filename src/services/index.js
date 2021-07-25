import Get from './Get'

// Get All Surahs
const getSurahList = () => Get('surat')

// Get Specific Surah
const getSurah = (id) => Get(`surat/${id}`)

const QuranAPI = 
{
    getSurahList,
    getSurah
}

export default QuranAPI