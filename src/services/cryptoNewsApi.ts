import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders: Record<string, string> = {
  "x-rapidapi-key": "1c73cbd6f1msh32a19adec4311d2p1a1cfbjsnfe031834378d",
  "x-rapidapi-host": "crypto-news16.p.rapidapi.com",
};

const baseUrl = "https://crypto-news16.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/news/coincu?limit=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
