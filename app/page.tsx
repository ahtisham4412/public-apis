"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Film, FilmsResponse } from "@/types/swapi";
import FilmCard from "@/components/FilmCard";

export default function Page() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<FilmsResponse>("/films")
      .then(res => {
        const sorted = res.data.results.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
        setFilms(sorted);
      })
      .catch(() => setError("Failed to load films. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen text-white">
      <section className="relative mx-auto max-w-6xl px-4 pt-14 sm:pt-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Star Wars Saga
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-200 sm:text-base">
            Browse every film in chronological release order. Click a card to
            view the opening crawl and key details.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        {loading && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-white/20 bg-[#141414]" />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</p>
        )}

        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {films.map((film) => (
              <FilmCard key={film.episode_id} film={film} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

