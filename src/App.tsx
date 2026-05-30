import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from 'bitquran/router'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1
        }
    }
})

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    )
}
