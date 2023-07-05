import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/constant";

export const imageUpload = createApi({
  reducerPath: "imageUpload",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => {
        return {
          url: `/files/single`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageUpload;
