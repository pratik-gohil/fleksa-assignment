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

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NDJJ6J9');`,
            }}
          />

          {/* Hotjar Tracking Code for 3.123.248.170 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2554851,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />

          {/* Amplitude analytics Script  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
              ;r.type="text/javascript"
              ;r.integrity="sha384-tzcaaCH5+KXD4sGaDozev6oElQhsVfbJvdi3//c2YvbY02LrNlbpGdt3Wq4rWonS"
              ;r.crossOrigin="anonymous";r.async=true
              ;r.src="https://cdn.amplitude.com/libs/amplitude-8.5.0-min.gz.js"
              ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
              console.log("[Amplitude] Error: could not load SDK")}}
              ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
              ;function s(e,t){e.prototype[t]=function(){
              this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
              var o=function(){this._q=[];return this}
              ;var a=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove"]
              ;for(var c=0;c<a.length;c++){s(o,a[c])}n.Identify=o;var u=function(){this._q=[]
              ;return this}
              ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
              ;for(var p=0;p<l.length;p++){s(u,l[p])}n.Revenue=u
              ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
              ;function v(e){function t(t){e[t]=function(){
              e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
              for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
              e=(!e||e.length===0?"$default_instance":e).toLowerCase()
              ;if(!Object.prototype.hasOwnProperty.call(n._iq,e)){n._iq[e]={_q:[]};v(n._iq[e])
              }return n._iq[e]};e.amplitude=n})(window,document);
              
              amplitude.getInstance().init("13e94566ae299c8fe7697c783f2fba7b");`,
            }}
          />

          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`} />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
