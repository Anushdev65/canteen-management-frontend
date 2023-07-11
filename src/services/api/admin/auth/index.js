import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../../config/constant";
import { getLevelInfo } from "../../../../localStorage/localStorage";

export const adminApi = createApi({
  reducerPath: "adminApi",
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
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/register`,
          method: "POST",
          body: body,
        };
      },
    }),
    verifyUser: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/verify-email`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/login`,
          method: "POST",
          body: body,
        };
      },
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: `/auths/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["getMyProfile"],
    }),
    logOut: builder.mutation({
      query: () => {
        return {
          url: `/auths/logout`,
          method: "PATCH",
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/forgot-password`,
          method: "POST",
          body: body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/reset-password`,
          method: "POST",
          body: body,
        };
      },
    }),

    getAllUsers: builder.query({
      query: (query) => {
        return {
          url: `/auths?_page=${query?._page}&_brake=${query?._brake}&_sort=${query?._sort}`,
          method: "GET",
        };
      },
      providesTags: ["getAllUsers"],
    }),

    updatePassword: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/update-password`,
          method: "PATCH",
          body: body,
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (body) => {
        return {
          url: `/auths/update-profile`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getMyProfile"],
    }),

    updateUserByAdmin: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/auths/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getUserProfile", "getAllUsers"],
    }),

    deleteUserByAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/auths/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllUsers"],
    }),

    getUserById: builder.query({
      query: (id) => {
        return {
          url: `/auths/${id}`,
          method: "Get",
        };
      },
      providesTags: ["getUserProfile"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useLazyGetAllUsersQuery,
  useGetMyProfileQuery,
  useLogOutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
  useUpdateUserByAdminMutation,
  useDeleteUserByAdminMutation,
  useLazyGetUserByIdQuery,
} = adminApi;
