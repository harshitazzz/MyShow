// src/pages/UserTheatres.jsx
import React, { useEffect, useState } from "react";
import API from "../libs/api";

const Theatres = () => {
  const [theatres, setTheatres] = useState([]);

  const fetchTheatres = async () => {
    try {
      const { data } = await API.get("/theatres"); // PUBLIC API
      setTheatres(data.theatres);
    } catch (err) {
      console.error(err);
      alert("Failed to load theatres");
    }
  };

  useEffect(() => {
    fetchTheatres();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="pt-40 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Theatres</h1>

        {theatres.length === 0 && (
          <p className="text-center text-gray-400">No theatres found.</p>
        )}

        <div className="flex flex-col gap-6">
          {theatres.map((t) => (
            <div
              key={t._id}
              className="
    glow-hover 
    p-8 mb-6 border rounded-2xl bg-gray-800 text-white shadow-lg
    flex justify-between items-start w-full min-h-[180px]
    transform transition-transform duration-300 ease-in-out
    hover:scale-105
  "
            >
              {/* LEFT SIDE */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{t.theatreName}</h2>
                <p className="text-gray-300 text-lg">City: {t.city}</p>
                <p className="text-gray-300 text-lg">Location: {t.location}</p>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right w-1/3">
                {t.movies?.length > 0 ? (
                  <>
                    <p className="font-semibold mb-2 text-lg">
                      Running Movies:
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      {t.movies.map((m) => (
                        <li key={m._id} className="text-base">
                          {m.movieName}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-400 text-base">No movies</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theatres;
