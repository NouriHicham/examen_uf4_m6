async function getPopularMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmVjNjg5ZjgxNzI4ZmNhZTk3YjVhMzA3ZmI5MDY1ZiIsIm5iZiI6MTc0ODg5MDkxMC4yNjcsInN1YiI6IjY4M2RmNTFlOTk0ZTgxMjZiZTdiYWQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hX6v3Osd5za6V2f6erPhFHxshgkcwhjhPcA1aZpMt38'
    },
  });

  if (!res.ok) throw new Error("Error al obtener películas");

  return res.json();
}

export default async function Peliculas() {
  const pelis = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pelis.results.map((peli: any) => (
          <div key={peli.id} className=" rounded-lg shadow-md p-4">
            <img src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} alt={peli.title} className="w-full object-cover" />
            <div className="pt-4">
              <h2 className="text-lg font-bold mb-1 text-white">{peli.title}</h2>
              <p className="text-white mb-2">
                ⭐ {peli.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}