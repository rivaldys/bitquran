import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toolbar from './Toolbar'

describe('Toolbar', () => {
    it('renders the verse number badge', () => {
        render(<Toolbar number={5} />)
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('does not render action buttons when neither prop is provided', () => {
        render(<Toolbar number={1} />)
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders audio button when audioButton prop is provided', () => {
        render(<Toolbar number={1} audioButton={{ isPlaying: false, onToggle: vi.fn() }} />)
        expect(screen.getByLabelText(/putar audio/i)).toBeInTheDocument()
    })

    it('shows pause label when audio is playing', () => {
        render(<Toolbar number={1} audioButton={{ isPlaying: true, onToggle: vi.fn() }} />)
        expect(screen.getByLabelText(/jeda audio/i)).toBeInTheDocument()
    })

    it('calls onToggle when the audio button is clicked', async () => {
        const onToggle = vi.fn()
        render(<Toolbar number={1} audioButton={{ isPlaying: false, onToggle }} />)
        await userEvent.click(screen.getByLabelText(/putar audio/i))
        expect(onToggle).toHaveBeenCalledOnce()
    })

    it('renders the doc button when docButton prop is provided', () => {
        render(<Toolbar number={1} docButton={{ onClick: vi.fn() }} />)
        expect(screen.getByLabelText(/tafsir/i)).toBeInTheDocument()
    })

    it('calls onClick when the doc button is clicked', async () => {
        const onClick = vi.fn()
        render(<Toolbar number={1} docButton={{ onClick }} />)
        await userEvent.click(screen.getByLabelText(/tafsir/i))
        expect(onClick).toHaveBeenCalledOnce()
    })
})
