import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function useHomeAnime() {
    const [data, setData] = useState({top: [], seasonal: []})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const sliderRef = useRef(null)
    const itemWidth = 550
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const cachedTop = JSON.parse(localStorage.getItem('topAnime') || 'null')
        const cachedSeasonal = JSON.parse(localStorage.getItem('seasonalAnime') || 'null')

        if (cachedTop && cachedSeasonal) {
            setData({ top: cachedTop, seasonal: cachedSeasonal })
            setLoading(false)
            return
        }

        const fetchData = async () => {
            try {
                const [topRes, seasonalRes] = await Promise.all([
                    axios.get('https://api.jikan.moe/v4/top/anime'),
                    axios.get('https://api.jikan.moe/v4/seasons/now')
                ])

                setData({ top: topRes.data.data, seasonal: seasonalRes.data.data })

                localStorage.setItem('topAnime', JSON.stringify(topRes.data.data))
                localStorage.setItem('seasonalAnime', JSON.stringify(seasonalRes.data.data))
            } catch (err) {
                if (err.response?.status === 429) {
                    console.warn('Too many requests. Retrying in 5 seconds...')
                    setTimeout(fetchData, 5000)
                    return
                }

                console.error('Failed to fetch anime data:', err)
                setError('Something went wrong while fetching anime data.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
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

    return {
        data,
        loading,
        error,
        sliderRef,
        handleNext,
        handlePrev
    }
}