import { Helmet } from "react-helmet"

export const apiUrl = 'https://backend-balisanti.siwalatri.klungkungkab.go.id/api/'

// export const apiUrl = 'http://192.168.0.199:8888/api/'

export function helmetAppender(head){
    if (head.includes("Bali Santi")) {
        return(
            <Helmet>
                <title>{head}</title>
            </Helmet>
        )
    } else {
        return(
            <Helmet>
                <title>{head} | Bali Santi</title>
            </Helmet>
        )
    }
}