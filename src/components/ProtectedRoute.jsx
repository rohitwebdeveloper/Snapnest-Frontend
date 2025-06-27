import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth?.status) {
      navigate('/sign-in')
    }
  }, [auth, navigate])


  if (!auth?.status) return null

  return children
}

export default ProtectedRoute
