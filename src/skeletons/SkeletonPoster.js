import React from 'react'
import Skeleton from './Skeleton'
import './Skeleton.css'

function SkeletonPoster() {
  return (
    <div className="skeleton-wrapper">
        <div className="skeleton-poster">
            <Skeleton type="poster"/>
        </div>
    </div>
  )
}

export default SkeletonPoster