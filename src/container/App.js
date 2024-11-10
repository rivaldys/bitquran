// Libraries
import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Menubar } from '../components'

// Pages
import { About, ChangeLog, Surah, SurahList, Tafsir } from '../pages'

// Style
import './App.css'

class App extends Component
{
    addMenubarShadow = () =>
    {
        const menubarWrapper = document.querySelector('.menubar-wrapper')

        // Adding shadow on topbar/menubar when window is scrolled
        window.addEventListener('scroll', () =>
        {
            if(window.pageYOffset > 0)
            {
                menubarWrapper.classList.add('scrolled')
            }
            else
            {
                menubarWrapper.classList.remove('scrolled')
            }
        })
    }

    sidemenuTrigger = () =>
    {
        const containerCover = document.querySelector('.container-cover')
        const sidemenu       = document.querySelector('.sidemenu')
        
        containerCover.classList.toggle('show')
        sidemenu.classList.toggle('show')
    }


    goToTop = () =>
    {
        // ===== Go to the Top
        const goToTop = document.querySelector('.goto-top')
        const vh      = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

        // When the button is clicked, do the automatic scroll to the top
        goToTop.addEventListener('click', () =>
        {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })

        // Show or hide 'Go to the Top' Button
        window.addEventListener('scroll', () =>
        {
            const winScroll = Math.round(window.pageYOffset)

            if(winScroll >= (vh / 2))
            {
                goToTop.classList.add('show')
            }
            else
            {
                goToTop.classList.remove('show')
            }
        })
    }

    componentDidMount()
    {
        this.addMenubarShadow()
        this.goToTop()
    }

    render()
    {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <>
                    {/* Menubar */}
                    <div className="menubar-wrapper">
                        <div className="container">
                            <Link to="/">
                                <div className="logo"></div>
                            </Link>

                            <Menubar mode="desktop" />

                            <div className="menu-icon" onClick={this.sidemenuTrigger}>
                                <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                                    <path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M80 160h352M80 256h352M80 352h352'/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Route Mapping */}
                    <Route path="/" exact component={SurahList} />
                    <Route path="/surat" exact component={SurahList} />
                    <Route path="/surat/:id" exact component={Surah} />
                    <Route path="/surat/:id/tafsir/:tafsirId" component={Tafsir} />
                    <Route path="/tentang" component={About} />
                    <Route path="/riwayat-pembaruan" component={ChangeLog} />

                    {/* Go to Top Button */}
                    <div className="goto-top">
                        <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                            <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 244l144-144 144 144M256 120v292'/>
                        </svg>
                    </div>

                    {/* Footer */}
                    <div className="footer-wrapper">
                        <p>
                            &copy; 2021-{new Date().getFullYear()} Bitquran v1.1.2<br />
                            Dibangun dengan se-
                            <svg className="svg-inline--fa fa-mug-hot fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mug-hot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path d="M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z"></path>
                            </svg>
                            teh oleh <a href="https://rivaldy.net" target="_blank" rel="noreferrer">Ahmad Rivaldy S</a>
                        </p>
                    </div>

                    {/* Sidemenu (only on mobile mode) */}
                    <div className="sidemenu">
                        <div className="close-button" onClick={this.sidemenuTrigger}>
                            &times;
                        </div>
                        
                        <Menubar mode="mobile" close={this.sidemenuTrigger} />
                    </div>
                    
                    {/* Showing window cover when sidemenu is active */}
                    <div className="container-cover" onClick={this.sidemenuTrigger}></div>
                </>
            </Router>
        )
    }
}

export default App