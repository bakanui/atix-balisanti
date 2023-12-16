import { Helmet } from "react-helmet"

export const apiUrl = 'https://backend-balisanti.siwalatri.klungkungkab.go.id/api/'

export function helmetAppender(head){
    return(
        <Helmet>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="title" content="Bali Santi" />
            <meta name="description" content="Pesan tiket pelayaran Bali jadi lebih mudah hanya di Bali Santi." />
            <meta property="og:title" content="Bali Santi" />
            <meta property="og:image" href="%PUBLIC_URL%/logo192.png" />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <title>{head} | Bali Santi</title>
        </Helmet>
    )
}