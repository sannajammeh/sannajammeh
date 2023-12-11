---
title: Using next/image to generate blurred image placeholders
date: 2022-01-01
description: An example of how to use next/image to generate blurred image placeholders using sharp
tags: [nextjs, next/image, image, placeholder, blur, blurDataURL]
image: ./images/blurred.jpg
---

# Using next/image to generate blurred image placeholders

Using the `next/image` component to generate blurred image placeholders serverside is an easy way to provide useful information to your users before the image manages to load. However, it is not always possible to generate a blurred image placeholder for every type of images. When you are dealing with dynamic data such as images from an external source, this process becomes very dificult.

## A simple example

This is a simple example of how to use the `next/image` component to generate blurred image placeholders automatically.

```jsx
import localImage from "public/localImage.png";

<Image src={localImage} placeholder="blur" />;
```

When a file is used as an image locally (i.e. not from an external source), the `next/image` component will automatically generate a blurred image placeholder.

## The problem with placeholder="blur"

When using a local image, the `next/image` component will automatically generate a blurred image placeholder. However, when using an external image or a local image as a string, the `next/image` component will not generate a blurred image placeholder and requires the client to provide a blurred image placeholder using `blurDataURL={'data:image/...'}`.

This makes fetching the blurred image placeholder very difficult. However, with a small amount of code, you can easily generate a blurred image placeholder for every type of image using `sharp`.

## Using `sharp` to generate blurred placeholders on the server

Here is how it works

1. Figure out if the image is local or external
2. Fetch the image if its external or figure out the filepath if its local
3. Generate a blurred image placeholder using `sharp`
4. Pass the blurred image placeholder to the client using `getStaticProps` or `getServerSideProps`

#### Creating the blurred image

```ts
// utils/image.ts

const ROOT_PATH = process.cwd(); // The root path of the project

// Converts a buffer to a base64 data URL
const bufferToDataURL = (buffer: Buffer) => {
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};

export const getBlurDataURL = async (url: string) => {
  let source: string | Buffer;
  if (url.startsWith("http")) {
    // Safe to assume this is an external image
    source = Buffer.from(await (await fetch(url)).arrayBuffer());
  } else {
    source = path.join(ROOT_PATH, "public", url);
  }

  // Resize the image as small as possible per Vercel's recommendation
  // I'm using 16:9 pixels as I know my images are using this ratio on the client
  const image = await sharp(source)
    .resize(16, 9, {
      fit: "cover", // Resize the image to fit the ratio
    })
    .jpeg()
    .toBuffer();

  return bufferToDataURL(image);
};
```

#### Usage

```tsx
// pages/index.tsx

export const getStaticProps = () => {
  const data = await api.homePageData(); // Image url provided from external source or markdown file

  return {
    props: {
      image: data.image,
      blurDataURL: await getBlurDataURL(data.image),
    },
  };
};

interface HomeProps {
  image: string;
  blurDataURL: string;
}

const Home: NextPage<HomeProps> = ({ image, blurDataURL }) => {
  return (
    <div>
      <Image src={image} placeholder="blur" blurDataURL={blurDataURL} />
    </div>
  );
};

export default Home;
```

There you go! Whenever you're fetching data from an external source, you can use `getStaticProps` or `getServerSideProps` to generate a blurred image placeholder.
