import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import SurahItem from './SurahItem'

const props = {
    number: 1,
    title: 'Al-Fatihah',
    description: 'Makkiyah • 7 Ayat',
    label: 'الفاتحة',
    href: '/surat/1'
}

describe('SurahItem', () => {
    it('renders the surah title', () => {
        render(<MemoryRouter><SurahItem {...props} /></MemoryRouter>)
        expect(screen.getByText('Al-Fatihah')).toBeInTheDocument()
    })

    it('renders the surah description', () => {
        render(<MemoryRouter><SurahItem {...props} /></MemoryRouter>)
        expect(screen.getByText('Makkiyah • 7 Ayat')).toBeInTheDocument()
    })

    it('renders the Arabic label', () => {
        render(<MemoryRouter><SurahItem {...props} /></MemoryRouter>)
        expect(screen.getByText('الفاتحة')).toBeInTheDocument()
    })

    it('renders the surah number', () => {
        render(<MemoryRouter><SurahItem {...props} /></MemoryRouter>)
        expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('links to the correct surah path', () => {
        render(<MemoryRouter><SurahItem {...props} /></MemoryRouter>)
        expect(screen.getByRole('link')).toHaveAttribute('href', '/surat/1')
    })
})
