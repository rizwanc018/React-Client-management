import { apiSliceAdmin } from "./apiSlice";

const ADMIN_URL = '/api/admin'

export const userApiSlice = apiSliceAdmin.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST',
            })
        }),
        update: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        changeProfileImage: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/profile/image`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useUpdateMutation, useChangeProfileImageMutation } = userApiSlice