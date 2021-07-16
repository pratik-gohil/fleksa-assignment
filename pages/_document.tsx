import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        pathname: ctx.pathname,
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NDJJ6J9');`,
            }}
          ></script>

          {(((this.props as any).pathname as string).startsWith('/menu') ||
            ((this.props as any).pathname as string) === '/checkout' ||
            ((this.props as any).pathname as string) === '/account/addresses') && (
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
              strategy="afterInteractive"
            ></Script>
          )}

          <Script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/19546797.js" strategy="afterInteractive"></Script>
        </Head>
        <body>
          <Main />
          {/* <button
            type="button"
            id="hs_show_banner_button"
            style={{
              backgroundColor: '#202020',
              border: '1px solid #202020',
              borderRadius: '3px',
              padding: '10px 16px',
              textDecoration: 'none',
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'normal',
              lineHeight: 'inherit',
              textAlign: 'left',
              textShadow: 'none',
            }}
            onClick={function () {
              var _hsp = (window._hsp = window._hsp || []);
              _hsp.push(['showBanner']);
            }}
          >
            Cookie Settings
          </button> */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
