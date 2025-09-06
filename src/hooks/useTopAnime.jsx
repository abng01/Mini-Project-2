import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export function useTopAnime() {
    const [topAnime, setTopAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const sliderRef = useRef(null)
    const itemWidth = 550
const hasFetched = useRef(false)

useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchTopAnime = async () => {
        try {
            const response = await axios.get("https://api.jikan.moe/v4/top/anime?limit=10")
            setTopAnime(response.data.data)
        } catch (err) {
            if (err.response && err.response.status === 429) {
                console.warn('Too many requests. Retrying in 3 seconds...')
                setTimeout(fetchTopAnime, 3000)
                return
            }
            console.error('Failed to fetch top anime:', err)
            setError('Something went wrong while fetching data.')
        } finally {
            setLoading(false)
        }
    }

    fetchTopAnime()
}, [])

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= itemWidth
        }
    }

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += itemWidth
        }
    }

    return {topAnime, loading, error, sliderRef, handleNext, handlePrev}
}

