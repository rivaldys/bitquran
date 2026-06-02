import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import * as sharedHooks from 'bitquran/shared/hooks'
import NavigationBar from './NavigationBar'

vi.mock('bitquran/shared/hooks', () => ({
    useDeviceTypeWatcher: vi.fn(() => 'desktop'),
    useWindowDimensions: vi.fn(() => ({ windowWidth: 1280, windowHeight: 800 }))
}))

vi.mock('bitquran/router', () => ({
    routes: [
        {
            name: 'App',
            type: 'group',
            children: [
                { name: 'Beranda', path: '/', type: 'page', element: null, meta: { navbar: { order: 1 } } },
                { name: 'Tentang', path: '/tentang', type: 'page', element: null, meta: { navbar: { order: 2 } } }
            ]
        }
    ]
}))

describe('NavigationBar', () => {
    afterEach(() => {
        vi.mocked(sharedHooks.useDeviceTypeWatcher).mockReturnValue('desktop')
    })

    it('renders the logo image', () => {
        render(<MemoryRouter><NavigationBar /></MemoryRouter>)
        expect(screen.getByAltText('Bitquran logo')).toBeInTheDocument()
    })

    it('renders navbar links on desktop', () => {
        render(<MemoryRouter><NavigationBar /></MemoryRouter>)
        expect(screen.getByRole('link', { name: 'Beranda' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Tentang' })).toBeInTheDocument()
    })

    it('renders the hamburger button on mobile', () => {
        vi.mocked(sharedHooks.useDeviceTypeWatcher).mockReturnValue('mobile')
        render(<MemoryRouter><NavigationBar /></MemoryRouter>)
        expect(screen.getByLabelText(/buka menu/i)).toBeInTheDocument()
    })
})
