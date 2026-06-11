import { render, screen } from '@testing-library/react'
import Select from './Select'

describe('Select', () => {
    it('renders a combobox', () => {
        render(
            <Select>
                <Select.Option value="1">Pilihan 1</Select.Option>
            </Select>
        )
        expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders options via Select.Option', () => {
        render(
            <Select>
                <Select.Option value="ar">Arab</Select.Option>
                <Select.Option value="id">Indonesia</Select.Option>
            </Select>
        )
        expect(screen.getByRole('option', { name: 'Arab' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Indonesia' })).toBeInTheDocument()
    })

    it('is disabled when the disabled prop is set', () => {
        render(
            <Select disabled>
                <Select.Option value="x">X</Select.Option>
            </Select>
        )
        expect(screen.getByRole('combobox')).toBeDisabled()
    })
})
