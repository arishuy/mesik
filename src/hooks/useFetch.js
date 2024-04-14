import { useState } from 'react'
import { setProfileToLS } from '../utils/auth'
import { useCookies } from 'react-cookie'

// Pass URL
const useFetch = (url) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cookies, setCookie] = useCookies(['user'])

  const handleGoogle = async (response) => {
    setLoading(true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ credential: response.credential })
    })
      .then((res) => {
        setLoading(false)

        return res.json()
      })
      .then((data) => {
        if (data?.user) {
          setProfileToLS(data?.user)
          setCookie('access_token', data.tokens.access_token, { path: '/' })
          setCookie('refresh_token', data.tokens.refresh_token, { path: '/' })
          window.location.reload()
        }
        throw new Error(data?.message || data)
      })
      .catch((error) => {
        setError(error?.message)
      })
  }
  return { loading, error, handleGoogle }
}

export default useFetch
