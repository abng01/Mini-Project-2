import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import useHomeAnime from "../hooks/useHomeAnime";

export default function Homepage() {
  const { loading, error, seasonal, top, popular } = useHomeAnime();

  return (
    <div className="pt-34 px-4 sm:overflow-x-hidden w-full sm:w-[40rem] md:w-[46rem] lg:w-[63rem] xl:w-[79rem] 2xl:w-[95rem] mb-5">
      {/* Seasonal anime code */}
      <p className="text-lg font-bold flex">Seasonal Anime</p>

      {loading && <p>Loading seasonal anime...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="w-full">
        <ul
          className="flex gap-4 mt-5 scroll-smooth overflow-x-auto md:overflow-x-hidden "
          ref={seasonal.ref}
        >
          {seasonal.data.map((anime) => (
            <li
              key={anime.mal_id}
              className="w-[200px] flex-shrink-0 p-2 rounded bg-[#393939] flex flex-col items-center"
            >
              <p className="w-[200px] h-[30px] pl-2 pr-2 text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
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
        <button onClick={seasonal.handlePrev} className="hidden md:block">
          <FaArrowLeftLong />
        </button>
        <button onClick={seasonal.handleNext} className="hidden md:block">
          <FaArrowRight />
        </button>
      </div>

      {/* Top anime code */}
      <p className="text-lg font-bold flex">Top Anime</p>

      {loading && <p>Loading top anime...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="w-full">
        <ul
          className="flex gap-4 mt-5 scroll-smooth overflow-x-auto md:overflow-x-hidden "
          ref={top.ref}
        >
          {top.data.map((anime) => (
            <li
              key={anime.mal_id}
              className="w-[200px] flex-shrink-0 p-2 rounded bg-[#393939] flex flex-col items-center"
            >
              <p className="w-[200px] h-[30px] pl-2 pr-2 text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
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
        <button onClick={top.handlePrev} className="hidden md:block">
          <FaArrowLeftLong />
        </button>
        <button onClick={top.handleNext} className="hidden md:block">
          <FaArrowRight />
        </button>
      </div>

      {/* Popular anime code */}
      <p className="text-lg font-bold flex">Popular Anime</p>

      {loading && <p>Loading popular anime...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="w-full">
        <ul
          className="flex gap-4 mt-5 scroll-smooth overflow-x-auto md:overflow-x-hidden"
          ref={popular.ref}
        >
          {popular.data.map((anime) => (
            <li
              key={anime.entry.mal_id}
              className="w-[200px] flex-shrink-0 p-2 rounded bg-[#393939] flex flex-col items-center"
            >
              <p className="w-[200px] h-[30px] pl-2 pr-2 text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                {anime.entry.title}
              </p>
              <img
                src={anime.entry.images.jpg.image_url}
                alt="Top anime image"
                className="w-[200px] h-[300px] object-cover rounded"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center mt-2 gap-4">
        <button onClick={popular.handlePrev} className="hidden md:block">
          <FaArrowLeftLong />
        </button>
        <button onClick={popular.handleNext} className="hidden md:block">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
