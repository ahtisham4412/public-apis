import React from "react";
import type { Film } from "@/types/swapi";
import Link from "next/link"; 

export default function FilmCard({ film }: { film: Film }) {
  const release = new Date(film.release_date).toLocaleDateString();
  const id = film.url.match(/\/films\/(\d+)\//)?.[1] ?? String(film.episode_id);

  return (
    <Link href={`/films/${id}`}>
      <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#151515] p-5 shadow-lg transition duration-300 hover:translate-y-[-2px] hover:bg-[#191919]">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{background:"radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.05), transparent 40%)"}} />
        <header className="relative z-10 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-wide">{film.title}</h3>
          <span className="text-[10px] rounded-full border border-yellow-400/80 bg-yellow-400/25 px-2 py-0.5 text-yellow-100">
            EP {film.episode_id}
          </span>
        </header>

        <p className="relative z-10 mt-1 text-xs text-gray-300">Released {release}</p>

        <p className="relative z-10 mt-3 line-clamp-4 text-sm text-gray-100">
          {film.opening_crawl}
        </p>

        <dl className="relative z-10 mt-4 grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div>
            <dt className="sr-only">Director</dt>
            <dd>
              <span className="text-gray-200">Director:</span> {film.director}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Producer</dt>
            <dd>
              <span className="text-gray-200">Producer:</span> {film.producer}
            </dd>
          </div>
        </dl>
      </article>
    </Link>
  );
}
