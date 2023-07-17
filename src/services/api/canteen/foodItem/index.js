import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../../config/constant";
import { getLevelInfo } from "../../../../localStorage/localStorage";

export const foodItemApi = createApi({
  reducerPath: "foodItemApi",
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
    createFoodItem: builder.mutation({
      query: (body) => {
        return {
          url: `/food`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllFoodItem"],
    }),

    getAllFoodItem: builder.query({
      query: (query) => {
        return {
          url: `/food?_page=${query?._page}&_brake=${query?._brake}&_sort=${query?._sort}`,
          method: "GET",
        };
      },
      providesTags: ["getAllFoodItem"],
    }),

    getFoodItemById: builder.query({
      query: (id) => {
        return {
          url: `/food/${id}`,
          method: "GET",
        };
      },
    }),

    updateFoodItem: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/food/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllFoodItem"],
    }),

    updateFoodMenu: builder.mutation({
      query: (body) => {
        return {
          url: `/food`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllFoodItem"],
    }),

    deleteFoodItem: builder.mutation({
      query: (id) => {
        return {
          url: `/food/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllFoodItem"],
    }),
  }),
});

export const {
  useCreateFoodItemMutation,
  useLazyGetAllFoodItemQuery,
  useGetAllFoodItemQuery,
  useGetFoodItemByIdQuery,
  useLazyGetFoodItemByIdQuery,
  useUpdateFoodItemMutation,
  useUpdateFoodMenuMutation,
  useDeleteFoodItemMutation,
} = foodItemApi;
