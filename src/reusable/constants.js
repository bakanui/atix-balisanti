import { Helmet } from "react-helmet"

export const apiUrl = 'https://backend-balisanti.siwalatri.klungkungkab.go.id/api/'

export function helmetAppender(head){
    return(
        <Helmet>
            <title>{head} | Bali Santi</title>
        </Helmet>
    )
}