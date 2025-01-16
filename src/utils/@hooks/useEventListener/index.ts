import { MutableRefObject, useEffect, useRef } from 'react'

type EventHandler = (event: Event) => void

export const useEventListener = (eventName: string, handler: EventHandler, element: HTMLElement | Window = window): void =>
{
    const savedHandler: MutableRefObject<EventHandler | undefined> = useRef()

    useEffect(() =>
    {
        savedHandler.current = handler
    }, [handler])

    useEffect(() =>
    {
        const isSupported = element && element.addEventListener
        if(!isSupported) return

        const eventListener = (event: Event) =>
        {
            if(savedHandler.current) savedHandler.current(event)
        }

        element.addEventListener(eventName, eventListener)

        return () =>
        {
            element.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element])
}