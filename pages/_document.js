import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          <link
            rel="preload"
            href="/fonts/Segoe ui historic.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <meta httpEquiv="Content-Security-Policy" content="font-src 'self' data:; img-src 'self' data:; default-src 'self' "/>

        </Head>
        <body style={{ minHeight: "100vh", position: "relative" }}>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}

export default MyDocument;
