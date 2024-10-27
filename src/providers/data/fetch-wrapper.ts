import { GraphQLFormattedError } from 'graphql';

type Error = {
    message: string;
    statusCode: string;
}

// This file is used to wrap the fetch function to add the Authorization header to the request. This is used to authenticate the user when making requests to the server. The customFetch function is used in the useMutation and useQuery hooks to make requests to the server. The customFetch function adds the Authorization header to the request if the access token is present in the local storage. The access token is stored in the local storage when the user logs in. The Authorization header is used to authenticate the user when making requests to the server. The customFetch function is used in the useMutation and useQuery hooks to make requests to the server. The customFetch function adds the Authorization header to the request if the access token is present in the local storage. The access token is stored in the local storage when the user logs in. The Authorization header is used to authenticate the user when making requests to the server.
const customFetch = async (url: string, options: RequestInit) => {
    const accessToken = localStorage.getItem("access_token");

    const headers = options.headers as Record<string, string>;

    return await fetch(url, {
        ...options,
        headers : {
            ...headers,
            "Authorization": headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Required-Preflight": "true"
        }
    })
}

// This function is used to handle the errors returned by the server. It extracts the error messages and status codes from the response body and returns an Error object with the error message and status code. This function is used in the useMutation and useQuery hooks to handle the errors returned by the server.
const getGraphQLErrors = ( body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
    if(!body) {
        return {
            message: "Unknown error",
            statusCode: "INTERNAL_SERVER_ERROR"
        }
    }

    if("errors" in body) {
        const errors = body?.errors;
        const messages = errors?.map((error) => error?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500,
        }
    }

    return null;
} 

// This function is used to make requests to the server. It calls the customFetch function to make the request and then extracts the response body. It then calls the getGraphQLErrors function to handle the errors returned by the server. If there are no errors, it returns the response. This function is used in the useMutation and useQuery hooks to make requests to the server.
export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);
    const responseClone = response.clone();
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if(error) {
        throw error;
    }

    return response;
}