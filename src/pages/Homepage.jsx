;import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSeasonalAnime } from "../hooks/useSeasonalAnime";

export default function Homepage() {
  const seasonal = useSeasonalAnime();

  return (
    <div className="pt-35 px-4">
      <p className="text-lg font-bold flex">Seasonal Anime</p>

      {seasonal.loading && <p>Loading anime...</p>}
      {seasonal.error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <ul
          className="flex gap-4 mt-5 overflow-hidden scroll-smooth"
          ref={seasonal.sliderRef}
        >
          {seasonal.seasonalAnime.map((anime) => (
            <li
              key={anime.mal_id}
              className="min-w-[220px] p-2 rounded flex flex-col mr-[0] items-center bg-[#393939]"
            >
              <p className="w-[200px] h-[30px] text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                {anime.title_english ? anime.title_english : anime.title}
              </p>
              <img
                src={anime.images.jpg.image_url}
                alt="Seasonal anime image"
                className="w-[200px] h-[300px] object-cover rounded"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center mt-2 gap-4">
        <button onClick={seasonal.handlePrev}>
          <FaArrowLeftLong />
        </button>
        <button onClick={seasonal.handleNext}>
          <FaArrowRight />
        </button>
      </div>
{/* 
      <div>
        <ul className="flex gap-4 mt-5 overflow-hidden scroll-smooth">
          {seasonalAnime.map((anime) => (
            <li
              key={anime.mal_id}
              className="min-w-[220px] p-2 rounded flex flex-col mr-[0] items-center bg-[#393939]"
            >
              <p className="w-[200px] h-[30px] text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                {anime.title_english ? anime.title_english : anime.title}
              </p>
              <img
                src={anime.images.jpg.image_url}
                alt="Seasonal anime image"
                className="w-[200px] h-[300px] object-cover rounded"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center mt-2 gap-4">
        <button onClick={handlePrev}>
          <FaArrowLeftLong />
        </button>
        <button onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div> */}
    </div>
  );
}
