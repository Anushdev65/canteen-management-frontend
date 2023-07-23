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
      invalidatesTags: ["getAllOrders"],
    }),

    getMyOrders: builder.query({
      query: () => {
        return {
          url: `/order-food/my-order`,
          method: "GET",
        };
      },
      providesTags: ["getAllOrders"],
    }),

    getAllOrders: builder.query({
      query: (query) => {
        return {
          url: `/order-food?today=${true}&user=${
            query?._userId || ""
          }&orderStatus=${query?._orderStatus || ""}`,
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
      invalidatesTags: ["getAllOrders"],
    }),

    serveOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order-food/serve/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["getAllOrders"],
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
  useLazyGetAllOrdersQuery,
  useCancelOrderMutation,
  useServeOrderMutation,
  useGetServedOrdersQuery,
  useDeliverOrderMutation,
} = foodOrderApi;
