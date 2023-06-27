import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../services/api/admin/auth";
import { imageUpload } from "../services/api/imageUpload";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [adminApi.reducerPath]: adminApi.reducer,
    [imageUpload.reducerPath]: imageUpload.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      adminApi.middleware,
      imageUpload.middleware,
    ]),
});

export default store;
