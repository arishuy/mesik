import axios from 'axios'
import urlConfig from '../../config/UrlConfig'

const AxiosInterceptors = axios.create()

AxiosInterceptors.interceptors.request.use(
  async (config) => {
    const token = getCookie('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

AxiosInterceptors.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await refreshAccessToken()
      AxiosInterceptors.defaults.headers.common.Authorization = 'Bearer ' + access_token
      return AxiosInterceptors(originalRequest)
    }
    return Promise.reject(error)
  }
)

const refreshAccessToken = async () => {
  const refresh_token = getCookie('refresh_token')
  const response = await axios
    .post(urlConfig.authentication.refreshToken, {
      refresh_token: refresh_token
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      removeCookie('access_token')
      removeCookie('refresh_token')
      localStorage.removeItem('profile')
      window.location.href = '/login'
    })
  document.cookie = `access_token=${response.data.access_token}; path=/;`
  return response.data.access_token
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
export default AxiosInterceptors
