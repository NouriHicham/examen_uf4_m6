import Image from "next/image";
import { useEffect, useState } from "react";

interface Movie {
  title: string;
  backdrop_path: string;
  overview: string;
  genres: { name: string }[];
  release_date: string;
  runtime: number;
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string | null;
}

export default function Detalle({ id }: { id: number }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch("https://api.themoviedb.org/3/movie/" + id, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmVjNjg5ZjgxNzI4ZmNhZTk3YjVhMzA3ZmI5MDY1ZiIsIm5iZiI6MTc0ODg5MDkxMC4yNjcsInN1YiI6IjY4M2RmNTFlOTk0ZTgxMjZiZTdiYWQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hX6v3Osd5za6V2f6erPhFHxshgkcwhjhPcA1aZpMt38",
        },
      });
      const data = await res.json();
      setMovie(data);
      
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmVjNjg5ZjgxNzI4ZmNhZTk3YjVhMzA3ZmI5MDY1ZiIsIm5iZiI6MTc0ODg5MDkxMC4yNjcsInN1YiI6IjY4M2RmNTFlOTk0ZTgxMjZiZTdiYWQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hX6v3Osd5za6V2f6erPhFHxshgkcwhjhPcA1aZpMt38",
          },
        }
      );
      const creditsData = await creditsRes.json();
      setCast(creditsData.cast.slice(0, 8));
    }
    if (id) fetchMovie();
  }, [id]);

  if (!movie) return <div>Cargando...</div>;

  return (
    <div className="p-4 min-w-xl">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt={movie.title}
        className="h-50 w-full object-cover"
        width={500}
        height={300}
      />
      <h1 className="text-xl font-bold mt-2 text-white">{movie.title}</h1>
      <div className="flex mt-2">
        <button className="mr-2 border border-0.5 text-white text-sm py-2 px-4 rounded cursor-pointer">
          Añadir favorito
        </button>
        <button className="mr-2 text-black bg-white text-sm py-2 px-4 rounded cursor-pointer">
          Ver Trailer
        </button>
      </div>
      <h2 className="text-lg font-bold mt-2 text-white">Sinopsis</h2>
      <p className="text-white mt-2">{movie.overview}</p>
      <h2 className="text-lg font-bold mt-2 text-white">Generos</h2>
      <div className="text-white mt-2">
        {movie.genres.map((genre) => (
          <span
            key={genre.name}
            className="mr-2 rounded-2xl bg-neutral-600 py-1 px-2"
          >
            {genre.name}
          </span>
        ))}
      </div>
      <div className="flex mt-2 justify-between">
        <div>
          <h2 className="text-lg font-bold mt-2 text-white">
            Fecha de estreno
          </h2>
          <p className="text-white mt-2">{movie.release_date}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mt-2 text-white">Duración</h2>
          <p className="text-white mt-2">{movie.runtime} minutos</p>
        </div>
        <div></div>
      </div>
      <h2 className="text-lg font-bold mt-2 text-white">Reparto</h2>
      <div className="flex flex-wrap gap-4">
        {cast.map((actor) => (
          <div key={actor.name} className="text-white w-32">
            {actor.profile_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                alt={actor.name}
                width={80}
                height={120}
                className="rounded"
              />
            )}
            <div className="font-bold">{actor.name}</div>
            <div className="text-xs">{actor.character}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
