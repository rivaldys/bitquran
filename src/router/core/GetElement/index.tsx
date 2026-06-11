import { AppLayout } from 'bitquran/components'
import type { Route } from 'bitquran/shared/types'
import type { ComponentType } from 'react'
import { Navigate, Outlet } from 'react-router'

interface GetElementProps {
    route: Route
}

export default function GetElement({ route }: GetElementProps) {
    if (route.type === 'group') {
        return (
            <AppLayout>
                <Outlet />
            </AppLayout>
        )
    }

    if (route.type === 'redirect') {
        return <Navigate to={route.meta?.redirection ?? '/'} replace />
    }

    if (route.type === 'page') {
        const Component = route.element as ComponentType<object>
        return <Component />
    }

    return null
}
