import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import siteMetadata from "@/lib/metadata";
import { getTagsWithCount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tags",
    description: `All tags in ${siteMetadata.title}`,
  };
}

export default function TagsPage({ params }: PageProps) {
  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">{params.username}</h1>
        <hr className="my-4" />

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://pbs.twimg.com/media/FGRnNpAVUAYqRYv?format=jpg&name=large"
                  alt=""
                />
              </div>
            </div>
            {/* <div className="grid gap-4">
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Benares-_The_Golden_Temple%2C_India%2C_ca._1915_%28IMP-CSCNWW33-OS14-66%29.jpg/1280px-Benares-_The_Golden_Temple%2C_India%2C_ca._1915_%28IMP-CSCNWW33-OS14-66%29.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://staticimg.amarujala.com/assets/images/2021/11/07/750x506/kashi-vishwanath-dham_1636258507.jpeg?w=674&dpr=1.0"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/25/Chet_Singh_Ghat_in_Varanasi.jpg"
                                    alt=""
                                />
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
