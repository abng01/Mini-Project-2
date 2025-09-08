import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

export default function RandomAnime() {
    const [randomAnime, setRandomAnime] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const fetchRandomAnime = async () => {
            try {
                while (true) {
                    const randomRes = await (axios.get('https://api.jikan.moe/v4/random/anime'))
                    console.log('Fetch successful: ', randomRes.data.data)
                    const anime = randomRes.data.data
                    
                    const isExcluded = ["Music", "CM", "OVA", "Special", "TV Special", "ONA"].includes(anime.type)

                    const nsfw = anime.genres?.some((genre) => 
                        ['ecchi', 'hentai'].includes(genre.name.toLowerCase())
                    )

                    if (!nsfw && !isExcluded) {
                        setRandomAnime(anime)
                        setLoading(false)
                        return
                    }
                }
            } catch (err) {
                console.error('Failed to fetch anime data:', err)
                setError('Something went wrong while fetching anime data.')
                setLoading(false)
            }
        }

        fetchRandomAnime()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{color: red}}>{error}</p>

    return (
        <div className="mt-30 pt-10 px-4 pb-20 sm:overflow-x-hidden w-full mb-5 grid grid-cols-2 gap-10 max-h-[80vh] bg-[#393939] rounded"> 
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-sm">
                    {randomAnime.title_english ? randomAnime.title_english : randomAnime.title}
                </h1>
                <img src={randomAnime.images.jpg.large_image_url} alt="Random anime image" className="mt-10 max-w-[500px] h-auto rounded"/>
            </div>

            <div className="text-left pr-10">
                <p className='text-xl pt-10'>{randomAnime.synopsis ? randomAnime.synopsis : "No description available."}</p>
                <div className='flex items-end h-[20px] mt-10'>
                    <p className='text-xl pt-10 font-semibold text-[#646cff]'>Genre: </p>
                    <span className='pl-3 text-lg'>
                        {randomAnime.genres.map((genre) => genre.name).join(', ')}
                    </span>
                </div>    
                <div className='flex items-end h-[20px] mt-5'>
                    <p className='text-xl pt-10 font-semibold text-[#646cff]'>Rating: </p>
                    <span className='pl-3 text-lg'>{randomAnime.rating}</span>
                </div>            
                <div className='flex items-end h-[20px] mt-5'>
                    <p className='text-xl pt-10 font-semibold text-[#646cff]'>Status: </p>
                    <span className='pl-3 text-lg'>{randomAnime.status}</span>
                </div>
                <div className='flex items-end h-[20px] mt-5'>
                    <p className='text-xl pt-10 font-semibold text-[#646cff]'>Season: </p>
                    <span className='pl-3 text-lg capitalize'>{randomAnime.season ? randomAnime.season : "Unavailable"}</span>
                </div>
                <div className='flex items-end h-[20px] mt-5'>
                    <p className='text-xl pt-10 font-semibold text-[#646cff]'>Release year: </p>
                    <span className='pl-3 text-lg capitalize'>{randomAnime.year ? randomAnime.year : "Unavailable"}</span>
                </div>
            </div>
        </div>
    )
}