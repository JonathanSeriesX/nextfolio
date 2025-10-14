import Gallery from "@/components/Gallery";
import photos from "@/content/photos.json";

export const dynamic = "force-static";

export default function PhotographyPage() {
  return (
    <section className="mx-auto max-w-5xl px-4">
      <h1 className="text-3xl font-semibold mt-12 mb-6">Photography</h1>
      <Gallery photos={photos as any} />
      <p className="text-sm text-neutral-400 mt-6">
        Put images in{" "}
        <code className="px-1 py-0.5 rounded bg-white/10">/public/photos</code>.
      </p>
    </section>
  );
}
