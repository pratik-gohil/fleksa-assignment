import { createGlobalStyle } from "styled-components";
import { BREAKPOINTS } from "./grid-system-configuration";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.fontFamily};
    scroll-padding-top: 110px;
  }

  :target {
    animation: background-fade 10s forwards;
    -webkit-animation: background-fade 3s forwards; /* Safari 4+ */
    -moz-animation:    background-fade 3s forwards; /* Fx 5+ */
    -o-animation:      background-fade 3s forwards; /* Opera 12+ */
    animation:         background-fade 3s forwards;
  }

  body::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  body::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }


  p {
    font-size: 16px;
    color: ${props => props.theme.textDarkColor};
    padding: 0;
    margin: ${props => props.theme.dimen.X4}px 0;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 24px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    p {
      font-size: 18px;
    }
    h1 {
      font-size: 48px;
    }

    h2 {
      font-size: 32px;
    }
  }

  @keyframes background-fade {
    0% {
      background #F7FFAD;
    }
    60% {
      background:#F7FFAD;
    }
    100% {
      background:transparent;
    }
  }

  @-webkit-keyframes pulsing {
    to {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  }

  @-moz-keyframes pulsing {
    to {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  }

  @-ms-keyframes pulsing {
    to {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  }

  @keyframes pulsing {
    to {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  }
`

export default GlobalStyle