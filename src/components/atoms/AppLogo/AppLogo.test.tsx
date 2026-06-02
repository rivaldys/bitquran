import { render, screen } from '@testing-library/react'
import AppLogo from './AppLogo'

describe('AppLogo', () => {
    it('renders an image with the Bitquran logo alt text', () => {
        render(<AppLogo />)
        expect(screen.getByAltText('Bitquran logo')).toBeInTheDocument()
    })

    it('applies a custom className', () => {
        render(<AppLogo className="w-10" />)
        expect(screen.getByAltText('Bitquran logo')).toHaveClass('w-10')
    })
})
