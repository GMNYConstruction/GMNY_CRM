export const getApiResponse = async ({apiRoute, method="POST"} : {apiRoute: string, method?: string}) =>{
    return await fetch(apiRoute, {
        method,
        })
        .then((res) => res.json())
        .then((json) => json);
}