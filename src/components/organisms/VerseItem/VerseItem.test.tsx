import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VerseItem from './VerseItem'

vi.mock('bitquran/shared/hooks', () => ({
    useAudioPlayer: () => ({ isPlaying: false, toggle: vi.fn() })
}))

const verse = { ar: 'بِسْمِ ٱللَّهِ', id: 'Dengan nama Allah' }

describe('VerseItem', () => {
    it('renders the Arabic text', () => {
        render(<VerseItem verse={verse} />)
        expect(screen.getByText('بِسْمِ ٱللَّهِ')).toBeInTheDocument()
    })

    it('renders the Indonesian translation', () => {
        render(<VerseItem verse={verse} />)
        expect(screen.getByText('Dengan nama Allah')).toBeInTheDocument()
    })

    it('does not render a toolbar when the toolbar prop is absent', () => {
        render(<VerseItem verse={verse} />)
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders the verse number when toolbar prop is provided', () => {
        render(<VerseItem verse={verse} toolbar={{ number: 3 }} />)
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('calls onTafsir when the doc button is clicked', async () => {
        const onTafsir = vi.fn()
        render(<VerseItem verse={verse} toolbar={{ number: 1, onTafsir }} />)
        await userEvent.click(screen.getByLabelText(/tafsir/i))
        expect(onTafsir).toHaveBeenCalledOnce()
    })
})
