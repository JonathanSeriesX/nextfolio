"use client";
import Image from "next/image";

type Photo = { src: string; alt?: string };
export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {photos.map((p, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] overflow-hidden rounded-xl"
        >
          <Image src={p.src} alt={p.alt ?? ""} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
