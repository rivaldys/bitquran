import { Input, SurahItem } from 'bitquran/components'
import { ILQuran } from 'bitquran/images'
import { SurahsProps } from 'bitquran/types'

export default function Surah({ surahs }: SurahsProps)
{
    return (
        <>
            <div className="rounded-[7px] sm:rounded-[10px] [background-image:linear-gradient(150deg,_#c5e1a5,_#009688)] mb-[20px] sm:mb-[30px]">
                <div
                    className="flex items-center h-[150px] sm:h-[250px] [background-position:bottom_-25px_right_-10px] sm:[background-position:bottom_-50px_right_-20px] bg-no-repeat [background-size:35%] sm:[background-size:30%]"
                    style={{ backgroundImage: `url(${ILQuran.src})` }}
                >
                    <div className="ml-[25px] sm:ml-[50px] box-border [&>*]:text-white">
                        <h1 className="text-[22px] leading-[29px] sm:text-[36px] sm:leading-[43px] font-semibold">Daftar Surat dalam Al-Qur'an</h1>
                        <p className="text-[14px] leading-[21px] sm:text-[20px] sm:leading-[27px]">114 Surat · Makkiyah · Madaniyah</p>
                    </div>
                </div>
            </div>

            <Input className="mb-[20px] md:mb-[30px]" placeholder="Cari nama surat" />

            {surahs &&
                surahs.data.map(surah => (
                    <SurahItem
                        containerClassName="mb-[15px]"
                        number={surah.number}
                        title={surah.name.transliteration.id}
                        description={surah.name.translation.id}
                        label={surah.name.short}
                        href={`/surat/${surah.number}`}
                        key={`surah-${surah.number}`}
                    />
                ))}
        </>
    )
}