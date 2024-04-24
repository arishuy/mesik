import path from './constants/path'
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
// layout
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import HomeLayout from './layouts/HomeLayout'
import AdminLayout from './pages/Admin/layouts/AdminLayout'
import UserLayout from './pages/User/layouts/UserLayout'

// common pages
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Profile = lazy(() => import('./pages/Profile'))
const HomePage = lazy(() => import('./pages/HomePage'))
const DetailArtist = lazy(() => import('./pages/DetailArtist'))
const DetailAlbum = lazy(() => import('./pages/DetailAlbum'))
const DetailPlaylist = lazy(() => import('./pages/DetailPlaylist'))
const MyPlaylist = lazy(() => import('./pages/MyPlaylist'))
const BXH = lazy(() => import('./pages/BXH'))
const MyAlbum = lazy(() => import('./pages/MyAlbum'))

// admin page
const MusicManagement = lazy(() => import('./pages/Admin/pages/MusicManagement'))
const GenreManagement = lazy(() => import('./pages/Admin/pages/GenreManagement'))
const UserManagement = lazy(() => import('./pages/Admin/pages/UsersManagement'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/dashboard' />
}

function AdminRoute() {
  const { role } = useContext(AppContext)
  return role === 'ADMIN' ? <Outlet /> : <Navigate to='/dashboard' />
}

function UserRoute() {
  const { role } = useContext(AppContext)
  return role === 'USER' ? <Outlet /> : <Navigate to='/dashboard' />
}

function ArtistRoute() {
  const { role } = useContext(AppContext)
  return role === 'ARTIST' ? <Outlet /> : <Navigate to='/dashboard' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.admin,
          element: <AdminRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: [
                {
                  path: path.adminProfile,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <Profile />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminMusic,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <MusicManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminGenre,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <GenreManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListUser,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <UserManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: path.user,
          element: <UserRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <UserLayout>
                        <Profile />
                      </UserLayout>
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <HomeLayout />,
      children: [
        {
          path: '',
          index: true,
          element: (
            <Suspense>
              <HomePage />
            </Suspense>
          )
        },
        {
          path: path.detailArtist,
          element: (
            <Suspense>
              <DetailArtist />
            </Suspense>
          )
        },
        {
          path: path.detailAlbum,
          element: (
            <Suspense>
              <DetailAlbum />
            </Suspense>
          )
          
        },
        {
          path: path.detailPlaylist,
          element: (
            <Suspense>
              <DetailPlaylist />
            </Suspense>
          )
        },
        {
          path: path.myPlaylist,
          element: (
            <Suspense>
              <MyPlaylist />
            </Suspense>
          )
        },
        {
          path: path.artist,
          element: <ArtistRoute />,
          children: [
            {
              path: '',
              children: [
                {
                  path: path.myAlbum,
                  element: (
                    <Suspense>
                      <MyAlbum />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: path.chart,
          element: (
            <Suspense>
              <BXH />
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routeElements
}
