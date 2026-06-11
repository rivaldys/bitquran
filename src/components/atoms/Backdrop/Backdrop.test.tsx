import { render } from '@testing-library/react'
import Backdrop from './Backdrop'

describe('Backdrop', () => {
    it('does not have the show class when isShown is false', () => {
        const { container } = render(<Backdrop isShown={false} />)
        expect(container.firstChild).not.toHaveClass('show')
    })

    it('has the show class when isShown is true', () => {
        const { container } = render(<Backdrop isShown={true} />)
        expect(container.firstChild).toHaveClass('show')
    })
})
