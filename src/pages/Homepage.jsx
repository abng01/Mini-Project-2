import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { FaArrowRight } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"

export default function Homepage() {
  const [seasonalAnime, setSeasonalAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchSeasonalAnime = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/seasons/now?page=${page}`)
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

  return (
    <div className="pt-30 px-4 ">
      <h1>Seasonal Anime</h1>

      {loading && <p>Loading anime...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="overflow-hidden">
        <ul className="flex space-x-4">
          {seasonalAnime.map((anime) => (
            <li key={anime.mal_id} className="min-w-[200px] p-4 rounded">
              <p>{anime.title}</p>
            </li>
          ))}
        </ul>
      </div>
          
      <div className="flex justify-center items-center mt-6 gap-4">
        <button><FaArrowLeftLong /></button>
        <p>Page {page}</p>
        <button><FaArrowRight /></button>
      </div>
    </div>
  )
}
