import {HomeLayout,Landing,Error,Products,SingleProduct,Cart,About,Register,Login,Checkout,Orders,} from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as singalProductLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as orderLoader } from './pages/Orders';

// actions
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';

import {store} from './store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement text="Landing Page or it's components"/>,
        loader : landingLoader(queryClient)
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement text="Product Page or it's components"/>,
        loader : productsLoader(queryClient)
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement text="Single Product Page or it's components"/>,
        loader : singalProductLoader(queryClient)
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader : checkoutLoader(store),
        action: checkoutAction(store,queryClient),

      },
      {
        path: 'orders',
        element: <Orders />,
        loader : orderLoader(store,queryClient)
      },
    ],
  },
  {
    path: '/login',
    element: <Login/>,
    errorElement: <Error />,
    action : loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action : registerAction
  },
]);

const App = ({store}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;