import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageUpload = createApi({
  reducerPath: "imageUpload",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/auths" }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => {
        return {
          url: `/register`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageUpload;
