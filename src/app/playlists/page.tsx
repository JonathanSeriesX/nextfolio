const playlists = [
  { title: "Techno Vitamins", spotify: "37i9dQZF1DX1s9knjP51Oa" },
  { title: "Ambient Focus", spotify: "37i9dQZF1DWZeKCadgRdKQ" },
];

export default function PlaylistsPage() {
  return (
    <section className="mx-auto max-w-5xl w-full">
      <h1 className="text-3xl font-semibold mb-6">Playlists</h1>
      <ul className="grid sm:grid-cols-2 gap-6">
        {playlists.map((p, i) => (
          <li key={i} className="space-y-2">
            <h3 className="font-medium">{p.title}</h3>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${p.spotify}`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
