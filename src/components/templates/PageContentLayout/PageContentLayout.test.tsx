import { render, screen } from '@testing-library/react'
import PageContentLayout from './PageContentLayout'

describe('PageContentLayout', () => {
    it('renders the children', () => {
        render(<PageContentLayout>Page body</PageContentLayout>)
        expect(screen.getByText('Page body')).toBeInTheDocument()
    })
})
