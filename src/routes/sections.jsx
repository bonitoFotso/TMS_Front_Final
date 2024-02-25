import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { ClientsProvider } from 'src/context/ClientsContext';
import { TaskFormProvider } from 'src/context/TaskFormContext';

import AuthGuard from './components/AuthGuard';
import { AgencesProvider } from '../context/AgencesContext';



export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const TachePage = lazy(() => import('src/pages/taches'));
export const TacheDetailPage = lazy(() => import('src/pages/taches'));
export const CliensPage = lazy(() => import('src/pages/clients'));
export const CliensDetailPage = lazy(() => import('src/pages/clientDetail'));
export const TechniciensPage = lazy(() => import('src/pages/techniciens'));
export const TestPage = lazy(() => import('src/pages/test'))
export const TachesListPage = lazy(() => import('src/pages/taches-list'))
export const CategoriePage = lazy(() => import('src/pages/categories'))
export const ActivitesPage = lazy(() => import('src/pages/activites'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
          <TaskFormProvider>
            <ClientsProvider>
              <AgencesProvider>
                <DashboardLayout>
                  <Suspense>
                    <AuthGuard>
                      <Outlet />
                    </AuthGuard>
                  </Suspense>
                </DashboardLayout>
              </AgencesProvider>
            </ClientsProvider>
          </TaskFormProvider>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'taches', element: <TachePage /> },
        { path: 'clients', element: <CliensPage /> },
        { path: 'client-details/:id', element: <CliensDetailPage /> },
        { path: 'techniciens', element: <TechniciensPage /> },
        { path: 'test', element: <TestPage /> },
        { path: 'taches-list', element: <TachesListPage /> },
        { path: 'categories', element: <CategoriePage /> },
        { path: 'activites', element: <ActivitesPage /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
