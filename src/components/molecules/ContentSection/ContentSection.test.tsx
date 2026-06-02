import { render, screen } from '@testing-library/react'
import ContentSection from './ContentSection'

describe('ContentSection', () => {
    it('renders its children', () => {
        render(<ContentSection>Section body</ContentSection>)
        expect(screen.getByText('Section body')).toBeInTheDocument()
    })
})
