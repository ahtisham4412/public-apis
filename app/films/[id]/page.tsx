"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import type { Film } from "@/types/swapi";
export default function FilmPage() {
	const params = useParams<{ id: string }>();
	const [film, setFilm] = useState<Film | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const id = params?.id;
		if (!id) return;
		api.get<Film>(`/films/${id}`)
			.then(res => setFilm(res.data))
			.catch(() => setError("Failed to load film details."))
			.finally(() => setLoading(false));
	}, [params]);
	if (loading) return <div className="min-h-screen text-white p-8">Loading...</div>;
	if (error) return <div className="min-h-screen text-white p-8">{error}</div>;
	if (!film) return null;
	return (
		<main className="min-h-screen text-white p-6">
			<div className="mx-auto w-full max-w-4xl">
				<Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-white">
					<span>←</span>
					<span>Back to films</span>
				</Link>
				<section className="mt-4 rounded-2xl border border-white/10 bg-[#151515] p-8 shadow-2xl">
					<h1 className="text-4xl font-extrabold tracking-wide text-yellow-200 drop-shadow">{film.title}</h1>
					<p className="mt-2 text-lg italic text-gray-200">Episode {film.episode_id}</p>
					<p className="mt-8 leading-relaxed text-gray-100">{film.opening_crawl}</p>
					<div className="mt-10 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
						<div className="rounded-xl bg-[#191919] p-4">
							<p className="text-gray-200">Director</p>
							<p className="font-semibold text-white">{film.director}</p>
						</div>
						<div className="rounded-xl bg-[#191919] p-4">
							<p className="text-gray-200">Producer</p>
							<p className="font-semibold text-white">{film.producer}</p>
						</div>
						<div className="rounded-xl bg-[#191919] p-4">
							<p className="text-gray-200">Release Date</p>
							<p className="font-semibold text-white">{new Date(film.release_date).toLocaleDateString()}</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}



