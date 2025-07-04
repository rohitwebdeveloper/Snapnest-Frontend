import React from 'react'
import { useSelector } from 'react-redux'
import PhotoGridSection from '../components/PhotoGridSection'

const Recently = () => {

    const recentlyAdded = useSelector((state) => state.recent)
    
  return (
    <PhotoGridSection title='Recently Added' photos={recentlyAdded} />
  )
}

export default Recently