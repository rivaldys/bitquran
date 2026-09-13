import { describe, expect, it } from 'vitest'
import resolveBaseName from './index'

describe('resolveBaseName', () => {
    const versionedBaseName = '/bitquran/v1/v1-2-5'

    it('uses the configured basename for a versioned route', () => {
        expect(resolveBaseName(versionedBaseName, versionedBaseName)).toBe(versionedBaseName)
        expect(resolveBaseName(`${versionedBaseName}/surat/1`, versionedBaseName)).toBe(
            versionedBaseName
        )
    })

    it('uses the latest alias for its root and client-side routes', () => {
        expect(resolveBaseName('/bitquran', versionedBaseName)).toBe('/bitquran')
        expect(resolveBaseName('/bitquran/surat/1', versionedBaseName)).toBe('/bitquran')
    })

    it('does not match a similarly named path', () => {
        expect(resolveBaseName('/bitquran-archive', versionedBaseName)).toBe(versionedBaseName)
    })

    it('normalizes a configured basename with leading or trailing slashes', () => {
        expect(resolveBaseName(versionedBaseName, 'bitquran/v1/v1-2-5/')).toBe(versionedBaseName)
    })
})
