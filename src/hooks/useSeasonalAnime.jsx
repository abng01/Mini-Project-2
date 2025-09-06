import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export function useSeasonalAnime() {
    const [seasonalAnime, setSeasonalAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const sliderRef = useRef(null)
    const itemWidth = 550

    useEffect(() => {
        const fetchSeasonalAnime = async () => {
            try {
                const response = await axios.get("https://api.jikan.moe/v4/seasons/now?")
                setSeasonalAnime(response.data.data) /* .data.data = array of anime */
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch seasonal anime:', err)
                setError('Something went wrong while fetching data.')
                setLoading(false)
            }
        }

        fetchSeasonalAnime()
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

    return { seasonalAnime, loading, error, handlePrev, handleNext, sliderRef}
}