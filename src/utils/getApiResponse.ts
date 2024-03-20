export const getApiResponse = async ({apiRoute, method="POST", body} : {apiRoute: string, method?: string, body?: any}) =>{
    return await fetch(apiRoute, {
        method: method,
        body: JSON.stringify(body),
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
        })
        .then((res) => res.json())
        .then((json) => json);
}