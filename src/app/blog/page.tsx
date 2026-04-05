import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on fleet energy cost management, EV charging reconciliation, and multi-fuel fleet finance.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue mb-3">
            Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
            Fleet finance insights
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Practical guides on fleet energy cost management, EV charging
            reconciliation, and multi-fuel finance.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">
              Articles coming soon. Subscribe to be the first to know.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-blue/30 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                    <span>&middot;</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-navy group-hover:text-blue transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
