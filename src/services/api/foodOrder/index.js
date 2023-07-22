import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLevelInfo } from "../../../localStorage/localStorage";
import { baseUrl } from "../../../config/constant";

export const foodOrderApi = createApi({
  reducerPath: "foodOrderApi",
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
    orderFood: builder.mutation({
      query: (body) => {
        return {
          url: `/order-food`,
          method: "POST",
          body: body,
        };
      },
    }),

    getMyOrders: builder.query({
      query: () => {
        return {
          url: `/order-food/my-order`,
          method: "GET",
        };
      },
    }),

    getAllOrders: builder.query({
      query: () => {
        return {
          url: `/order-food`,
          method: "GET",
        };
      },
    }),

    cancelOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order-food/cancel/${id}`,
          method: "PATCH",
        };
      },
    }),

    serveOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order-food/serve/${id}`,
          method: "PATCH",
        };
      },
    }),

    getServedOrders: builder.query({
      query: () => {
        return {
          url: `/order-food/serve`,
          method: "GET",
        };
      },
    }),

    deliverOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order-food/deliver/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useOrderFoodMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useCancelOrderMutation,
  useServeOrderMutation,
  useGetServedOrdersQuery,
  useDeliverOrderMutation,
} = foodOrderApi;
