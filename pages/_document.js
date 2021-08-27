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
          <meta httpEquiv="Content-Security-Policy" content="unsafe-inline; font-src 'self' data:; img-src 'self' data:; default-src 'self' https://facebook-5130.herokuapp.com"/>

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
