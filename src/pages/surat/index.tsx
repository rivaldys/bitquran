import { Input, SurahItem } from 'bitquran/components'
import { ILQuran } from 'bitquran/images'
import { SurahsProps } from 'bitquran/types'

export default function Surah({ surahs }: SurahsProps)
{
    return (
        <div>
            <div className="rounded-[10px] [background-image:linear-gradient(150deg,_#c5e1a5,_#009688)] mb-[30px]">
                <div
                    className="flex items-center h-[250px] [background-position:bottom_-50px_right_-20px] bg-no-repeat [background-size:30%]"
                    style={{ backgroundImage: `url(${ILQuran.src})` }}
                >
                    <div className="ml-[50px] box-border [&>*]:text-white">
                        <h1 className="text-[36px] leading-[43px] font-semibold">Daftar Surat dalam Al-Qur'an</h1>
                        <p className="text-[20px] leading-[27px]">114 Surat · Makkiyah · Madaniyah</p>
                    </div>
                </div>
            </div>

            <Input className="mb-[30px]" placeholder="Cari nama surat" />

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
        </div>
    )
}