"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import Detalle from "./Detalle";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function Peliculas() {
  const [pelis, setPelis] = useState<{ results: Movie[] }>({ results: [] });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmVjNjg5ZjgxNzI4ZmNhZTk3YjVhMzA3ZmI5MDY1ZiIsIm5iZiI6MTc0ODg5MDkxMC4yNjcsInN1YiI6IjY4M2RmNTFlOTk0ZTgxMjZiZTdiYWQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hX6v3Osd5za6V2f6erPhFHxshgkcwhjhPcA1aZpMt38'
        },
      });
      const data = await res.json();
      setPelis(data);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      setSelectedId(JSON.parse(storedId));
    }
  }, []);

  const handleId = (id: number) => {
    localStorage.setItem('id', JSON.stringify(id));
    setSelectedId(id);
  };

  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <form className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar película..."
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring w-full max-w-xs"
        />
      </form>
      <div className="flex gap-4">
        <div className="max-w-6xl grid grid-cols-3 gap-4">
          {pelis.results.map((peli: Movie) => (
            <div key={peli.id} onClick={() => handleId(peli.id)} className="rounded-lg shadow-md p-4 cursor-pointer">
              <Image src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} alt={peli.title} className="w-full object-cover" width={500} height={500}/>
              <div className="pt-4">
                <h2 className="text-lg font-bold mb-1 text-white">{peli.title}</h2>
                <p className="text-white mb-2">
                  ⭐ {peli.vote_average}
                </p>
              </div>
            </div>
          ))}
        </div>            
          {selectedId && (
            <Detalle id={selectedId} />
          )}
      </div>
    </div>
  );
}