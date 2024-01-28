import { ContextProviders } from "./hooks/ContextProvider";
import { DefaultLayout } from "./pages/layout/DefaultLayout";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 5 * 60 * 1000
      }
    }
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextProviders>
          <div className="AppBox">
            <ToastContainer />
            <DefaultLayout />
            <ReactQueryDevtools />
          </div>
        </ContextProviders>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
