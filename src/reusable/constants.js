import { Helmet } from "react-helmet"

export const apiUrl = 'https://api.siwalatri.klungkungkab.go.id/api/'

// export const apiUrl = 'https://api-siwalatri.bakanui.online/api/'

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