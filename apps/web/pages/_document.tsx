import Document, { Html, Head, Main, NextScript } from "next/document";

class PageDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Sanna Jammeh is a fullstack developer based in Oslo, Norway, with a passion for design and complex applications."
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/images/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/images/favicon/safari-pinned-tab.svg"
            color="#151718"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/images/favicon/favicon.svg"
          />
          <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#151718" />
          <meta
            name="msapplication-config"
            content="/images/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#151718" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default PageDocument;
