import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
 

  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/api/v1/booking",
        method: "POST",
        body: data,
      }),
      // invalidatesTags:['booking']
    }),
    getBookingDetail: builder.query({
      query: () => ({
        url: `/api/v1/bookingDetail`,
        method: "GET",
      }),
      providesTags:['booking']
    }),
    avalbility: builder.mutation({
      query: (data) => ({
        url: "/api/v1/availability",
        method: "POST",
        body: data,
      }),
    }),
    approvebooking: builder.mutation({
      query: (data) => ({
        url: "/api/v1/approve-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['booking']
    }),
    checkAvailibility:builder.mutation({
      query: (data) => ({
        url: "/api/v1/check-availibility",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const { useCreateBookingMutation,useAvalbilityMutation,useGetBookingDetailQuery ,useApprovebookingMutation,useCheckAvailibilityMutation} = storeApi;
