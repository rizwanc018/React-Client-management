import { apiSlice } from "./apiSlice";

const USER_URL = '/api/user'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: data => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: data => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            })
        }),
        update: builder.mutation({
            query: data => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        changeProfileImage: builder.mutation({
            query: data => ({
                url: `${USER_URL}/profile/image`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateMutation, useChangeProfileImageMutation } = userApiSlice