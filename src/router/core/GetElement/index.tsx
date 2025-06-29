import { AppLayout } from 'bitquran/components'
import type { Route, RouteComponentProps } from 'bitquran/shared/types'
import { type ComponentType, createElement } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

interface GetElementProps {
    route: Route
}

export default function GetElement({ route }: GetElementProps)
{
    const navigate = useNavigate()

    if(route.type === 'group')
    {
        return (
            <AppLayout>
                <Outlet />
            </AppLayout>
        )
    }

    if(route.type === 'redirect')
    {
        const to = route.meta?.redirection ?? '/'
        return <Navigate to={to} replace />
    }

    if(route.type === 'page')
    {
        const element = createElement(route.element as ComponentType<RouteComponentProps>, { navigate })

        return (
            <AppLayout>
                {element}
            </AppLayout>
        )
    }

    return null
}