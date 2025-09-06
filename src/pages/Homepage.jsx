import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
// import { useSeasonalAnime } from "../hooks/useSeasonalAnime"
// import { useTopAnime } from "../hooks/useTopAnime"
import useHomeAnime from "../hooks/useHomeAnime";

export default function Homepage() {
  const { data, loading, error, sliderRef, handleNext, handlePrev } =
    useHomeAnime();

  return (
    <div className="pt-35 px-4">
      <p className="text-lg font-bold flex">Seasonal Anime</p>

      {loading && <p>Loading seasonal anime...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="w-full">
        <ul
          className="flex gap-4 mt-5 min-w-max overflow-x-hidden scroll-smooth"
          ref={sliderRef}
        >
          {data.seasonal.map((anime) => (
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
      </div>

      <p className="text-lg font-bold flex mt-10">Top Anime</p>

      {loading && <p>Loading top anime...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <ul
          className="flex gap-4 mt-5 overflow-hidden scroll-smooth"
          ref={sliderRef}
        >
          {data.top.map((anime) => (
            <li
              key={anime.mal_id}
              className="min-w-[220px] p-2 rounded flex flex-col mr-[0] items-center bg-[#393939]"
            >
              <p className="w-[200px] h-[30px] text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                {anime.title_english ? anime.title_english : anime.title}
              </p>
              <img
                src={anime.images.jpg.image_url}
                alt="Top anime image"
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
      </div>
    </div>
  );
}
