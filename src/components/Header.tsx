import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <Link href="/">
          <img src="/vercel.svg" alt="logo" className="w-10" />
        </Link>
        <h1 className="ml-2">Examen UF4 M6 - Peliculas</h1>
      </div>
      <ul className="flex gap-4 list-none ">
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/movieExplorer">Peliculas</Link>
        </li>
        <li className="hover:underline">
          <Link href="/About">About</Link>
        </li>
      </ul>
    </header>
  );
}