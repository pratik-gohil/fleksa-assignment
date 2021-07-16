import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
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

          {(((this.props as any).pathname as string).startsWith('/menu') ||
            ((this.props as any).pathname as string) === '/checkout' ||
            ((this.props as any).pathname as string) === '/account/addresses') && (
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <button
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
          </button>
          <NextScript />
        </body>
      </Html>
    );
  }
}
