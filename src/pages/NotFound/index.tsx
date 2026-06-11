import { Head } from 'bitquran/shared/lib'
import { Link } from 'react-router'

export default function NotFound() {
    return (
        <>
            <Head>
                <title>404 — Bitquran</title>
            </Head>

            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-3.75">
                <p className="text-[80px] font-semibold text-[#e0f2f1] leading-none">404</p>
                <h2 className="text-[#757575] text-[24px] font-normal mt-2.5 mb-1.25">
                    Halaman tidak ditemukan
                </h2>
                <p className="text-[#999999] text-sm mb-6.25">
                    Halaman yang kamu cari tidak ada atau telah dipindahkan.
                </p>
                <Link
                    to="/"
                    className="px-6.25 py-2.5 rounded-[7px] text-white text-sm font-normal bg-[linear-gradient(150deg,#c5e1a5,#009688)] hover:opacity-80 transition"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </>
    )
}
