import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../services/api/admin/auth";
import { imageUpload } from "../services/api/imageUpload";
import { foodCategoryApi } from "../services/api/canteen/foodcategory";
import { foodItemApi } from "../services/api/canteen/foodItem";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [adminApi.reducerPath]: adminApi.reducer,
    [imageUpload.reducerPath]: imageUpload.reducer,
    [foodCategoryApi.reducerPath]: foodCategoryApi.reducer,
    [foodItemApi.reducerPath]: foodItemApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      adminApi.middleware,
      foodCategoryApi.middleware,
      foodItemApi.middleware,
      imageUpload.middleware,
    ]),
});

export default store;
