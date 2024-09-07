import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";

export const store = configureStore({
    reducer:{
        [productsApi.reducerPath]:productsApi.reducer
    },
    middleware:(getAllMiddleware) => getAllMiddleware().concat(productsApi.middleware)
})
