import React from 'react';
import Head from 'next/head';
import { ScreenClassProvider, setConfiguration } from 'react-grid-system';
import App, { AppInitialProps, AppContext } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import isWebView from 'is-webview';
import wrapper from '../redux/store.redux';
import { BREAKPOINTS } from '../constants/grid-system-configuration';

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    ctx.store.dispatch({ type: 'APP', payload: 'was set in _app' });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
      },
    };
  };

  /**
   * Loading hubspot script on web view
   */
  componentDidMount() {
    // TODO: Only load for browser view
    if (isWebView(navigator.userAgent)) return;

    var loadScript = function (src: string) {
      var tag = document.createElement('script');
      tag.async = false;
      tag.src = src;
      tag.id = 'hs-script-loader';
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    };

    loadScript('//js.hs-scripts.com/19546797.js');
  }

  public render() {
    setConfiguration({
      containerWidths: [BREAKPOINTS.sm, BREAKPOINTS.md, BREAKPOINTS.lg, BREAKPOINTS.xl, BREAKPOINTS.xxl],
    });
    const { Component, pageProps } = this.props;

    return (
      <ScreenClassProvider>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no" />
        </Head>
        <Component {...pageProps} />
      </ScreenClassProvider>
    );
  }
}

export default wrapper.withRedux(appWithTranslation(WrappedApp));
