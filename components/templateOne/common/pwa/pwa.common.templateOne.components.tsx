import React from 'react';
import Head from 'next/head'
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';

export const PwaMeta = () => {
  const shopData = useAppSelector(selectShop)
  
  return <Head>
    <meta name="application-name" content={shopData?.name} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content={shopData?.name} />
    {/* <meta name="description" content="Best PWA App in the world" /> */}
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    {/* <meta name="msapplication-config" content="/static/icons/browserconfig.xml" /> */}
    <meta name="msapplication-TileColor" content="#2B5797" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="theme-color" content="#000000" />

    {/* <link rel="apple-touch-icon" href="/static/icons/touch-icon-iphone.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/touch-icon-ipad.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/touch-icon-iphone-retina.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="/static/icons/touch-icon-ipad-retina.png" /> */}

    {/* <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" /> */}
    {/* <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" /> */}
    <link rel="manifest" href="/pwa/manifest.json" crossOrigin="use-credentials" />
    {/* <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" /> */}
    <link rel="shortcut icon" href={shopData?.logo} />

    {/* <link rel="apple-touch-startup-image" href="/static/images/apple_splash_2048.png" sizes="2048x2732" />
    <link rel="apple-touch-startup-image" href="/static/images/apple_splash_1668.png" sizes="1668x2224" />
    <link rel="apple-touch-startup-image" href="/static/images/apple_splash_1536.png" sizes="1536x2048" />
    <link rel="apple-touch-startup-image" href="/static/images/apple_splash_1125.png" sizes="1125x2436" />
    <link rel="apple-touch-startup-image" href="/static/images/apple_splash_1242.png" sizes="1242x2208" />
    <link rel="apple-touch-startup-image" href="/static/images/apple_splash_750.png" sizes="750x1334" />
    <link rel="apple-touch-startup-image" href="/static/images/apple_splash_640.png" sizes="640x1136" /> */}
  </Head>
};
