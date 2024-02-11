import baseApi from "../../baseApi"
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: userInfo,
                }
            },
        }),
    })
})

export const { useLoginMutation } = authApi