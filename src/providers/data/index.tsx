import graphqlDataProvider, { GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = 'https://api.crm.refine.dev';
export const API_URL = 'https://api.crm.refine.dev';
export const WS_URL = 'wss://api.crm.refine.dev/graphql';

// Create a GraphQL client
export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        } catch (error) {
            return Promise.reject(error as Error);
        }
    }
});

// Create a WebSocket client
export const wsClient = typeof window !== 'undefined' 
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
            const accessToken = localStorage.getItem("access_token");
            return {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
    })
    : undefined;

// Create a data provider
export const dataProvider = graphqlDataProvider(client);

// Create a live provider
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;
