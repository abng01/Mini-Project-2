import React, {useEffect, useState} from 'react'
import axios from 'axios'
// import tailwindcss from '@tailwindcss/vite'

export default function Homepage() {
  const [seasonalAnime, setSeasonalAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSeasonalAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/seasons/now')
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
    <div className="pt-28">
      <h1>Seasonal Anime</h1>

      {loading && <p>Loading anime...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className="h-64 overflow-x-auto">
      <ul>
        {seasonalAnime.map((anime) => (
          <li key={anime.mal_id}>
            <p>{anime.title}</p>
          </li>
        ))}
      </ul>
    </div>

    </div>
  )
}
