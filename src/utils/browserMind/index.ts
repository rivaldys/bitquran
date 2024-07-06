interface memorizeOptions {
    memory: any
    protect?: boolean
}

interface rememberOptions {
    protect?: boolean
}

const memorize = (key: string, { memory, protect = false }: memorizeOptions) =>
{
    if(protect)
    {
        // 
    }

    const stringValue = JSON.stringify(memory)
    localStorage.setItem(key, stringValue)
}

const remember = (key: string, { protect }: rememberOptions = {}) =>
{
    if(protect)
    {
        // 
    }

    const value = localStorage.getItem(key)
    if(value != null) return JSON.parse(value)
}

export const browserMind = (() => ({ memorize, remember }))()