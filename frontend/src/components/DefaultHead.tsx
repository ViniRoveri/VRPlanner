import Head from "next/head"

type Props = {
   title: string
}

export default function DefaultHead(props: Props){
   return(
      <Head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <title>{props.title}</title>
         <link rel="icon" href="/img/icon.png" type="image/x-icon"/>
      </Head>
   )
}