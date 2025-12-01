import React from 'react'
import { useParams } from 'react-router-dom'

const SeatLayout = () => {
    const { id, date } = useParams()
    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold">Seat Layout</h1>
            <p>Booking for movie ID: {id} on {date}</p>
        </div>
    )
}

export default SeatLayout
