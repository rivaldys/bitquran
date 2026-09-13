const latestBaseName = '/bitquran'

const normalizeBaseName = (baseName: string) => {
    if (baseName === '/') return '/'
    return `/${baseName.replace(/^\/+|\/+$/g, '')}`
}

const matchesBaseName = (pathname: string, baseName: string) => {
    return pathname === baseName || pathname.startsWith(`${baseName}/`)
}

const resolveBaseName = (pathname: string, configuredBaseName: string) => {
    const versionedBaseName = normalizeBaseName(configuredBaseName)
    const baseNames = [versionedBaseName, latestBaseName]

    return baseNames.find(baseName => matchesBaseName(pathname, baseName)) ?? versionedBaseName
}

export default resolveBaseName
