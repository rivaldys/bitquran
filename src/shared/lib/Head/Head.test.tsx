import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Head from './Head'

describe('Head', () => {
    const originalTitle = document.title

    afterEach(() => {
        document.title = originalTitle
        document.head.querySelectorAll('[data-testid]').forEach(el => el.remove())
    })

    describe('title', () => {
        it('sets document.title from a <title> child', () => {
            render(
                <Head>
                    <title>Bitquran</title>
                </Head>
            )
            expect(document.title).toBe('Bitquran')
        })

        it('does not change title when <title> has no string content', () => {
            document.title = 'Original'
            render(
                <Head>
                    <title>{undefined}</title>
                </Head>
            )
            expect(document.title).toBe('Original')
        })
    })

    describe('meta tags', () => {
        it('creates a <meta> element in document.head', () => {
            render(
                <Head>
                    <meta name="description" content="Quran app" />
                </Head>
            )
            const el = document.head.querySelector('meta[name="description"]')
            expect(el).not.toBeNull()
            expect(el?.getAttribute('content')).toBe('Quran app')
        })

        it('updates attributes on an existing element instead of creating a duplicate', () => {
            render(
                <Head>
                    <meta name="description" content="first" />
                </Head>
            )
            render(
                <Head>
                    <meta name="description" content="second" />
                </Head>
            )
            const elements = document.head.querySelectorAll('meta[name="description"]')
            expect(elements.length).toBe(1)
            expect(elements[0].getAttribute('content')).toBe('second')
        })

        it('resolves uniqueness by the property attribute', () => {
            render(
                <Head>
                    <meta property="og:title" content="Bitquran" />
                </Head>
            )
            const elements = document.head.querySelectorAll('meta[property="og:title"]')
            expect(elements.length).toBe(1)
        })
    })

    describe('link tags', () => {
        it('creates a <link> element resolved by rel', () => {
            render(
                <Head>
                    <link rel="canonical" href="https://bitquran.net" />
                </Head>
            )
            const el = document.head.querySelector('link[rel="canonical"]')
            expect(el).not.toBeNull()
            expect(el?.getAttribute('href')).toBe('https://bitquran.net')
        })
    })

    describe('cleanup', () => {
        it('removes dynamically created elements on unmount', () => {
            const { unmount } = render(
                <Head>
                    <meta name="test-cleanup" content="x" />
                </Head>
            )
            expect(document.head.querySelector('meta[name="test-cleanup"]')).not.toBeNull()
            unmount()
            expect(document.head.querySelector('meta[name="test-cleanup"]')).toBeNull()
        })

        it('does not remove pre-existing elements on unmount', () => {
            const existing = document.createElement('meta')
            existing.setAttribute('name', 'pre-existing')
            document.head.appendChild(existing)

            const { unmount } = render(
                <Head>
                    <meta name="pre-existing" content="x" />
                </Head>
            )
            unmount()

            expect(document.head.querySelector('meta[name="pre-existing"]')).not.toBeNull()
            existing.remove()
        })
    })

    describe('invalid tags', () => {
        it('warns in dev mode for unsupported tag names', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
            render(
                <Head>
                    <div />
                </Head>
            )
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('<div> is not supported'))
            warnSpy.mockRestore()
        })

        it('does not append unsupported tags to document.head', () => {
            vi.spyOn(console, 'warn').mockImplementation(() => undefined)
            const before = document.head.querySelectorAll('div').length
            render(
                <Head>
                    <div />
                </Head>
            )
            expect(document.head.querySelectorAll('div').length).toBe(before)
        })
    })

    it('renders null — no DOM node added by the component itself', () => {
        const { container } = render(
            <Head>
                <title>Test</title>
            </Head>
        )
        expect(container.firstChild).toBeNull()
    })
})
