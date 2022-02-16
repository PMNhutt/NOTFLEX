import React from 'react'
import './Skeleton.css'

function Skeleton({ type }) {
    const classes = `skeleton ${type}`;


    return (
        <div className={classes}>

        </div>
    )
}

export default Skeleton