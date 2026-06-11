import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
    it('renders a text input', () => {
        render(<Input />)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('forwards the placeholder attribute', () => {
        render(<Input placeholder="Cari surah..." />)
        expect(screen.getByPlaceholderText('Cari surah...')).toBeInTheDocument()
    })

    it('disables spell check', () => {
        render(<Input />)
        expect(screen.getByRole('textbox')).toHaveAttribute('spellcheck', 'false')
    })

    it('calls onChange when the user types', async () => {
        const onChange = vi.fn()
        render(<Input onChange={onChange} />)
        await userEvent.type(screen.getByRole('textbox'), 'Al-Fatihah')
        expect(onChange).toHaveBeenCalled()
    })
})
