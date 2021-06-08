import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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