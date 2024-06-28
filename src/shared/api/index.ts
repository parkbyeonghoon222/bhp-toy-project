import axios from "axios";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { ApiRouters } from "../../../server";

export const API_URL = "http://localhost:8080";

export const apiInstance = axios.create({
  baseURL: API_URL,
});

export const client = createTRPCClient<ApiRouters>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
