import { Html, Head, Main, NextScript } from 'next/document'

const stylesBody = `bg-fixed bg-gradient-to-tr from-default-white via-default-beige to-default-white
dark:from-default-black dark:via-default-darkBrown dark:to-default-black`

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={stylesBody}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
