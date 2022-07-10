
// Save global state, global css, global... everything!

import '../styles/global.css';

export default function App({ Component, pageProps }) {
  console.log(pageProps);
  return <Component {...pageProps} />;
}