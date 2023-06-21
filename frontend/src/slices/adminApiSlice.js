import { apiSliceAdmin } from "./apiSlice";

const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSliceAdmin.injectEndpoints({
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
        home: builder.query({
            query: data => ({
                url: `${ADMIN_URL}`,
                method: 'GET',
            }),
        }),
        delete: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/user/${data}`,
                method: 'DELETE',
            }),
        }),
        addUser: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/user`,
                method: 'POST',
                body: data
            }),
        }),
        getUser: builder.query({
            query: data => ({
                url: `${ADMIN_URL}/user/${data}`,
                method: 'GET',
            }),
        }),
        editUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${ADMIN_URL}/user/${id}`,
                method: 'PUT',
                body: data
            }),
        }),
        searchUser: builder.query({
            query: (data) => ({
                url: `${ADMIN_URL}?q=${data}`,
                method: 'GET',
            }),
        }),
    })
})

export const { useLoginMutation,
    useLogoutMutation,
    useHomeQuery,
    useDeleteMutation,
    useAddUserMutation,
    useGetUserQuery,
    useEditUserMutation,
    useSearchUserQuery
} = adminApiSlice