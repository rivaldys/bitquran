import { describe, expect, it } from 'vitest'
import cn from './index'

describe('cn', () => {
    it('joins multiple class strings', () => {
        expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
    })

    it('ignores falsy values', () => {
        expect(cn('foo', false, undefined, null, '', 'bar')).toBe('foo bar')
    })

    it('handles conditional object syntax', () => {
        expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('handles array inputs', () => {
        expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('resolves conflicting Tailwind utilities — last wins', () => {
        expect(cn('p-4', 'p-2')).toBe('p-2')
        expect(cn('text-sm', 'text-base')).toBe('text-base')
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    })

    it('keeps non-conflicting utilities from both inputs', () => {
        expect(cn('p-4 text-sm', 'text-base')).toBe('p-4 text-base')
    })

    it('returns empty string when all values are falsy', () => {
        expect(cn(false, undefined, null)).toBe('')
    })
})
