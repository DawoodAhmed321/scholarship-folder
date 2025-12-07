import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/logo.png" />
        <title>Scholarship Folder | Your Scholarship Partner</title>
        <meta
          name="description"
          content="Scholarship Folder Is Your Scholarship Partner Helping You Find The Right Scholarship For You"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
