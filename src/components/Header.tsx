import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/vercel.svg" alt="logo" width={20} height={20}/>
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