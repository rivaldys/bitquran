// Libraries
import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

// Pages
import { About, Surah, SurahList } from '../pages'

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

    componentDidMount()
    {
        this.addMenubarShadow()
    }

    render()
    {
        return (
            <Router>
                <>
                    <div className="menubar-wrapper">
                        <div className="content menubar">
                            <Link to="/">Beranda</Link>
                            <Link to="/tentang">Tentang</Link>
                        </div>
                    </div>
                    
                    <Route path="/" exact component={SurahList} />
                    <Route path="/surat" exact component={SurahList} />
                    <Route path="/surat/:id" component={Surah} />
                    <Route path="/tentang" component={About} />
                </>
            </Router>
        )
    }
}

export default App