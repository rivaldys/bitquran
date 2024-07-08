import packageInfo from 'bitquran/package'

export default function Footer()
{
    const year = new Date().getFullYear()

    return (
        <footer className="h-[75px] mt-[30px] bg-[#f0f0f0] flex flex-col justify-center items-center box-border border-t-[1px] border-t-[#eaeaea] text-[#999999] text-xs leading-[19px] text-center">
            <div className="content-container">
                <p>&copy; 2021-{year} Bitquran v{packageInfo.version}</p>
                <div className="flex justify-center">
                    <p>Dibangun dengan se-</p>
                    <svg className="fill-[#999999] w-[14px] mb-[2px] mx-[3px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mug-hot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        <path d="M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z"></path>
                    </svg>
                    <p>teh oleh</p>
                    <a className="text-[#4CAF50] transition duration-300 hover:opacity-75 ml-[2px]" href="https://rivaldy.net" target="_blank" rel="noreferrer">Ahmad Rivaldy S</a>
                </div>
            </div>
        </footer>
    )
}