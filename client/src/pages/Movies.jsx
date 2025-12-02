import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../libs/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    minRating: '',
    sortBy: '',
    search: ''
  });
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const navigate = useNavigate();

  const genres = ['', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

  const fetchMovies = async (overrideFilters) => {
    try {
      const params = overrideFilters || { page, ...filters };
      const res = await API.get('/movies', { params });
      if (res.data.success) {
        setMovies(res.data.movies);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch movies', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, filters]);

  useEffect(() => {
    if (!filters.search) {
      setAutocompleteResults([]);
      return;
    }

    const fetchAutocomplete = async () => {
      try {
        const res = await API.get('/movies', {
          params: { search: filters.search, page: 1 }
        });
        if (res.data.success) {
          setAutocompleteResults(res.data.movies);
        }
      } catch (err) {
        console.error('Autocomplete error', err);
      }
    };

    fetchAutocomplete();
  }, [filters.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleAutocompleteClick = (movieName) => {
    setFilters((prev) => ({ ...prev, search: movieName }));
    setAutocompleteResults([]);
    fetchMovies({ search: movieName, page: 1 });
  };

  return (
    <div className="bg-gray-900 text-white pt-36 px-8">


      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center relative">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search Movie"
            value={filters.search}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-800 w-64"
          />
          {autocompleteResults.length > 0 && (
            <div className="absolute bg-gray-700 rounded w-64 max-h-60 overflow-auto z-50 mt-1">
              {autocompleteResults.map((movie) => (
                <div
                  key={movie._id}
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleAutocompleteClick(movie.movieName)}
                >
                  {movie.movieName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Genre Dropdown */}
        <select
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          className="p-2 rounded bg-gray-800"
        >
          {genres.map((g) => (
            <option key={g} value={g}>{g || 'All Genres'}</option>
          ))}
        </select>

        <input
          type="number"
          name="year"
          placeholder="Release Year"
          value={filters.year}
          onChange={handleFilterChange}
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="number"
          name="minRating"
          placeholder="Min Rating"
          value={filters.minRating}
          onChange={handleFilterChange}
          className="p-2 rounded bg-gray-800"
          min="0"
          max="10"
        />
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="p-2 rounded bg-gray-800"
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/movies/${movie._id}`)}
          >
            <img
              src={movie.imageUrl}
              alt={movie.movieName}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{movie.movieName}</h2>
              <p className="text-gray-400 text-sm mb-2">
                {movie.genre} • {movie.releaseYear}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500 font-bold text-lg">
                  ★ {movie.imdbRating}
                </span>
                <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {movies.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          <p>No movies currently showing.</p>
        </div>
      )}
    </div>
  );
};

export default Movies;