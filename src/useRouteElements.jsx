import path from './constants/path'
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
// layout
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import HomeLayout from './layouts/HomeLayout'
import AdminLayout from './pages/Admin/layouts/AdminLayout'

// common pages
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Profile = lazy(() => import('./pages/Profile'))
const HomePage = lazy(() => import('./pages/HomePage'))
const DetailArtist = lazy(() => import('./pages/DetailArtist'))
const DetailAlbum = lazy(() => import('./pages/DetailAlbum'))
const DetailPlaylist = lazy(() => import('./pages/DetailPlaylist'))
const ArtistSongs = lazy(() => import('./pages/ArtistSongs'))
const MyPlaylist = lazy(() => import('./pages/MyPlaylist'))
const BXH = lazy(() => import('./pages/BXH'))
const MyAlbum = lazy(() => import('./pages/MyAlbum'))
const Promote = lazy(() => import('./pages/Promote'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const ThuVien = lazy(() => import('./pages/ThuVien'))
const PayMent = lazy(() => import('./pages/PayMent'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const BuyPremium = lazy(() => import('./pages/BuyPremium'))
const ValidateEmail = lazy(() => import('./pages/ValidateEmail'))

// user page
const BecomeArtist = lazy(() => import('./pages/User/pages/BecomeArtist'))

// admin page
const Dashboard = lazy(() => import('./pages/Admin/pages/DashBoard'))
const MusicManagement = lazy(() => import('./pages/Admin/pages/MusicManagement'))
const GenreManagement = lazy(() => import('./pages/Admin/pages/GenreManagement'))
const UserManagement = lazy(() => import('./pages/Admin/pages/UsersManagement'))
const RequestManagement = lazy(() => import('./pages/Admin/pages/RequestManagement'))
const AlbumManagement = lazy(() => import('./pages/Admin/pages/AlbumManagement'))
const PlaylistManagement = lazy(() => import('./pages/Admin/pages/PlaylistManagement'))
const RegionManagement = lazy(() => import('./pages/Admin/pages/RegionManagement'))
const ReportManagement = lazy(() => import('./pages/Admin/pages/ReportManagement'))
const PremiumPackageManagement = lazy(() => import('./pages/Admin/pages/PremiumPackageManagement'))
const HistoryTransaction = lazy(() => import('./pages/Admin/pages/HistoryTransaction'))
const SectionManagement = lazy(() => import('./pages/Admin/pages/SectionManagement'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function AdminRoute() {
  const { role } = useContext(AppContext)
  return role === 'ADMIN' ? <Outlet /> : <Navigate to='/' />
}

function UserRoute() {
  const { role } = useContext(AppContext)
  return role === 'USER' ? <Outlet /> : <Navigate to='/' />
}

function ArtistRoute() {
  const { role } = useContext(AppContext)
  return role === 'ARTIST' ? <Outlet /> : <Navigate to='/' />
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
            },
            {
              path: path.forgotPassword,
              element: (
                <Suspense>
                  <ForgotPassword />
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
                  path: path.adminRequest,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <RequestManagement />
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
                  path: path.adminAlbum,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <AlbumManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminPlaylist,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <PlaylistManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminRegion,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <RegionManagement />
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
                },
                {
                  path: path.adminListReport,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <ReportManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminPremiumPackage,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <PremiumPackageManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListTransaction,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <HistoryTransaction />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminDashBoard,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <Dashboard />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminSection,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <SectionManagement />
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
              children: []
            }
          ]
        },

        {
          path: path.artist,
          element: <ArtistRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: []
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
          path: path.myLibrary,
          element: (
            <Suspense>
              <ThuVien />
            </Suspense>
          )
        },
        {
          path: path.changePassword,
          element: (
            <Suspense>
              <ChangePassword />
            </Suspense>
          )
        },
        {
          path: path.artistProfile,
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          )
        },
        {
          path: path.profile,
          element: (
            <Suspense>
              <Profile />
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
          path: path.user,
          element: <UserRoute />,
          children: [
            {
              path: '',
              children: [
                {
                  path: path.becomeArtist,
                  element: (
                    <Suspense>
                      <BecomeArtist />
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
          path: path.buyPremium,
          element: (
            <Suspense>
              <BuyPremium />
            </Suspense>
          )
        },
        {
          path: path.artistSongs,
          element: (
            <Suspense>
              <ArtistSongs />
            </Suspense>
          )
        },
        {
          path: path.search,
          element: (
            <Suspense>
              <SearchPage />
            </Suspense>
          )
        },
        {
          path: path.promoteToArtist,
          element: (
            <Suspense>
              <Promote />
            </Suspense>
          )
        },
        {
          path: path.paymentResponse,
          element: (
            <Suspense>
              <PayMent />
            </Suspense>
          )
        },
        {
          path: path.validateEmail,
          element: (
            <Suspense>
              <ValidateEmail />
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
