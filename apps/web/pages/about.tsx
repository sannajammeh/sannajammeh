import Layout from "../components/Layout";
import Image from "next/image";
import devCard from "public/images/dev-card.png";

export default function About() {
  return (
    <Layout>
      <main className="container mx-auto prose prose-invert pt-32">
        <div className="flex gap-4">
          <figure className="w-[200px] relative !m-0">
            <Image
              objectFit="contain"
              objectPosition="top center"
              placeholder="blur"
              src={devCard}
            />
          </figure>
          <div>
            <blockquote>Coming soon...</blockquote>
          </div>
        </div>
      </main>
    </Layout>
  );
}
