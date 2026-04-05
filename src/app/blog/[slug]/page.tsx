import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-navy transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-navy tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400 mt-4">
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
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none prose-headings:text-navy prose-headings:tracking-tight prose-a:text-blue prose-a:no-underline hover:prose-a:underline prose-code:text-navy prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
          {/* MDX content would be rendered here with a proper MDX renderer */}
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-2xl bg-navy p-8 md:p-12 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            See your fleet&apos;s data gap
          </h3>
          <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
            Find out what you&apos;re missing in your EV transaction data — book a
            15-minute discovery call.
          </p>
          <Link
            href="/demo"
            className="inline-block px-6 py-2.5 bg-blue text-white rounded-lg text-sm font-medium hover:bg-blue-dark transition-colors"
          >
            Book a call
          </Link>
        </div>

        {/* Related Posts */}
        {allPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-bold text-navy mb-6">Related articles</h3>
            <div className="space-y-4">
              {allPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-6 rounded-xl border border-gray-200 hover:border-blue/30 transition-colors"
                >
                  <h4 className="font-semibold text-navy text-sm hover:text-blue transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{p.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
