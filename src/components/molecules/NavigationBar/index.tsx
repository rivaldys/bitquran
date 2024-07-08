import Link from 'next/link'

const navigations = [
    {
        id: 1,
        name: 'Beranda',
        path: '/'
    },
    {
        id: 2,
        name: 'Tentang',
        path: '/tentang'
    },
    {
        id: 3,
        name: 'Riwayat Pembaruan',
        path: '/riwayat-pembaruan'
    },
]

export default function NavigationBar()
{
    return (
        <nav>
            <ul className="flex list-none overflow-hidden mb-0">
                {navigations.map(navigation => (
                    <li>
                        <Link
                            className="block transition duration-300 text-[#757575] text-sm leading-[21px] font-normal px-5 py-[5px] hover:text-[#4CAF50] hover:cursor-pointer"
                            href={navigation.path}
                            key={navigation.id}
                        >
                            {navigation.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}