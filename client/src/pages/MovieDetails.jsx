import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    const { id } = useParams()
    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold">Movie Details</h1>
            <p>Displaying details for movie ID: {id}</p>
        </div>
    )
}

export default MovieDetails
