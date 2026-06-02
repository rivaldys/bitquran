import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AppLayout from './AppLayout'

vi.mock('bitquran/shared/hooks', () => ({
    useDeviceTypeWatcher: () => 'desktop',
    useWindowDimensions: () => ({ windowWidth: 1280, windowHeight: 800 })
}))

vi.mock('bitquran/router', () => ({
    routes: []
}))

describe('AppLayout', () => {
    it('renders the children', () => {
        render(
            <MemoryRouter>
                <AppLayout><p>Page content</p></AppLayout>
            </MemoryRouter>
        )
        expect(screen.getByText('Page content')).toBeInTheDocument()
    })

    it('renders the footer landmark', () => {
        render(
            <MemoryRouter>
                <AppLayout><span>Content</span></AppLayout>
            </MemoryRouter>
        )
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
})
