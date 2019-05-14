// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    console.log('MyDocument getInitialProps props as ctx ===========================================================>:'
    )
    //console.log(ctx);
    return { ...initialProps };
  }

  // <style>{`body { margin: 0 } /* custom! */`}</style>
  render() {
    return (
      <Html>
        <Head>
          {/* Import CSS for style test */}
          {/* <link rel='stylesheet' type='text/css' href='/static/style.css' /> */}
          {/* Import CSS for nprogress */}
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
          </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;