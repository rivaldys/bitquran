import { Icon } from 'bitquran/components'
import packageInfo from 'bitquran/package'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="h-18.75 mt-7.5 bg-[#f0f0f0] flex flex-col justify-center items-center box-border border-t border-t-[#eaeaea] text-[#999999] text-xs leading-4.75 text-center">
            <div className="content-container">
                <p>
                    &copy; 2021-{year} Bitquran v{packageInfo.version}
                </p>
                <div className="flex justify-center items-center">
                    <p>Dibangun dengan se-</p>
                    <span className="mb-0.5 mx-0.75">
                        <Icon name="mug-hot" size={14} color="#999999" />
                    </span>
                    <p>teh oleh</p>
                    <a
                        className="text-[#4CAF50] transition duration-300 hover:opacity-75 ml-0.5"
                        href="https://rivaldy.net"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ahmad Rivaldy S
                    </a>
                </div>
            </div>
        </footer>
    )
}
