import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function useHomeAnime() {
    const [data, setData] = useState({top: [], seasonal: [], popular: []})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
   
    const seasonalRef = useRef(null)
    const topRef = useRef(null)
    const popularRef = useRef(null)
    // const randomRef = useRef(null)

    const itemWidth = 550
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const cachedTop = JSON.parse(localStorage.getItem('topAnime') || 'null')
        const cachedSeasonal = JSON.parse(localStorage.getItem('seasonalAnime') || 'null')
        const cachedPopular = JSON.parse(localStorage.getItem('popularAnime') || 'null')
        // const cachedRandom = JSON.parse(localStorage.getItem('randomAnime') || 'null')

        if (cachedTop && cachedSeasonal && cachedPopular) {
            setData({ top: cachedTop, seasonal: cachedSeasonal, popular: cachedPopular})
            setLoading(false)
            return
        }

        const fetchData = async () => {
            try {
                const [topRes, seasonalRes, popularRes] = await Promise.all([
                    axios.get('https://api.jikan.moe/v4/top/anime'),
                    axios.get('https://api.jikan.moe/v4/seasons/now'),
                    axios.get('https://api.jikan.moe/v4/watch/promos/popular')
                ])

                setData({ 
                    top: topRes.data.data, 
                    seasonal: seasonalRes.data.data, 
                    popular: popularRes.data.data
                })

                localStorage.setItem('topAnime', JSON.stringify(topRes.data.data))
                localStorage.setItem('seasonalAnime', JSON.stringify(seasonalRes.data.data))
                localStorage.setItem('popularAnime', JSON.stringify(popularRes.data.data))
                // localStorage.setItem('randomAnime', JSON.stringify([randomRes.data.data]))
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

    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollLeft -= itemWidth
        }
    }

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollLeft += itemWidth
        }        
    }

    return {
        loading,
        error,
        seasonal: {
            data: data.seasonal,
            ref: seasonalRef,
            handleNext: () => scrollRight(seasonalRef),
            handlePrev: () => scrollLeft(seasonalRef)
        },
        top: {
            data: data.top,
            ref: topRef,
            handleNext: () => scrollRight(topRef),
            handlePrev: () => scrollLeft(topRef)            
        },
        popular: {
            data: data.popular,
            ref: popularRef,
            handleNext: () => scrollRight(popularRef),
            handlePrev: () => scrollLeft(popularRef)              
        }
    }
}