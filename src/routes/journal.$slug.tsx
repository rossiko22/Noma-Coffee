import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/lib/journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    return {
      meta: [
        { title: p ? `${p.title} — Journal` : "Journal" },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: p?.title ?? "" },
        { property: "og:description", content: p?.excerpt ?? "" },
        { property: "og:image", content: p?.cover },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/journal/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/journal/${params.slug}` }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="mb-4">Post not found.</h1>
      <Link to="/journal" className="btn-ghost mt-4">Back to journal</Link>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <article>
      <header className="pt-16 md:pt-24 pb-10">
        <div className="container-x max-w-3xl">
          <Link to="/journal" className="eyebrow link-underline">← Journal</Link>
          <p className="eyebrow mt-8 mb-4">{post.category} · {post.date}</p>
          <h1>{post.title}</h1>
        </div>
      </header>

      <div className="container-x mb-16">
        <img src={post.cover} alt={post.title} className="w-full aspect-[16/9] object-cover" />
      </div>

      <div className="container-x pb-32">
        <div className="max-w-2xl mx-auto space-y-7 text-[1.1rem] leading-[1.75] text-foreground/85">
          {post.body.map((para: string, i: number) => <p key={i}>{para}</p>)}
        </div>
      </div>
    </article>
  );
}
