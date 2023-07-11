import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../../config/constant";
import { getLevelInfo } from "../../../../localStorage/localStorage";

export const foodCategoryApi = createApi({
  reducerPath: "foodCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const levelInfo = getLevelInfo();
      const token = levelInfo && levelInfo.token ? levelInfo.token : "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body) => {
        return {
          url: `/category`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),

    getAllCategory: builder.query({
      query: () => {
        return {
          url: `/category`,
          method: "GET",
        };
      },
      providesTags: ["getAllCategory"],
    }),

    updateCategory: builder.mutation({
      query: (body) => {
        return {
          url: `/category`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = foodCategoryApi;
