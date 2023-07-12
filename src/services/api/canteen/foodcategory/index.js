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
    createFoodCategory: builder.mutation({
      query: (body) => {
        return {
          url: `/category`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),

    getAllFoodCategory: builder.query({
      query: (query) => {
        return {
          url: `/category?_page=${query?._page}&_brake=${query?._brake}&_sort=${query?._sort}`,
          method: "GET",
        };
      },
      providesTags: ["getAllCategory"],
    }),

    updateFoodCategory: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/category/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),

    deleteFoodCategory: builder.mutation({
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
  useLazyGetAllFoodCategoryQuery,
  useCreateFoodCategoryMutation,
  useGetAllFoodCategoryQuery,
  useDeleteFoodCategoryMutation,
  useUpdateFoodCategoryMutation,
} = foodCategoryApi;
