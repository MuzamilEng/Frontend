import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
 

  endpoints: (builder) => ({
    getProducts:builder.query({
      query: () => ({
        url: "/store/products",
        method: "GET",
      }),
      providesTags:['products']
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/store/products/${id}`,
        method: "GET",
      }),
      providesTags:['products']
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/admin/products/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:['products']
    })
  }),
});

export const {useGetProductsQuery,useGetProductByIdQuery,useUpdateProductMutation} = storeApi;