const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>

    const debouncedFunction = (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }

    debouncedFunction.cancel = () => clearTimeout(timeoutId)

    return debouncedFunction as T & { cancel: () => void }
}

export default debounce