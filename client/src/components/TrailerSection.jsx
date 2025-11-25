import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function TrailerInfiniteScroll() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => setMovies(res.data.results));
  }, []);

  const openTrailer = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    const trailers = res.data.results.filter(
      v => v.type === "Trailer" && v.site === "YouTube"
    );

    if (!trailers.length) {
      alert("No trailer found!");
      return;
    }

    const key = trailers[0].key;
    window.open(`https://www.youtube.com/watch?v=${key}`, "_blank");
  };

  // Duplicate list for infinite scroll effect
  const infiniteList = [...movies, ...movies];

  // Handle infinite scroll
  const handleScroll = () => {
    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth / 2; // half because list is doubled

    if (container.scrollLeft >= scrollWidth) {
      container.scrollLeft = container.scrollLeft - scrollWidth;
    }
  };

  return (
    <div className="overflow-hidden px-4 py-2">
      <h1 className="text-white mb-3 font-semibold">Trailers</h1>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {infiniteList.map((movie, index) => (
          <img
            key={index}
            src={`${IMG_URL}${movie.poster_path}`}
            onClick={() => openTrailer(movie.id)}
            className="w-[180px] h-[260px] rounded-xl cursor-pointer object-cover hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
}