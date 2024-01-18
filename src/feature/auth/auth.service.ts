import { baseApi } from '@/app/providers/store/base-api.ts'
import { SignUpArgs, LoginArgs, User } from '@/feature/auth/auth.types.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<User | null, void>({
      queryFn: async (_args, _queryApi, _extraOptions, fetchWithBQ) => {
        const res = await fetchWithBQ({
          url: `v1/auth/me`,
          method: 'GET',
        })

        if (res.error) {
          return { data: null }
        }

        return { data: res.data as User }
      },
      providesTags: ['Me'],
    }),
    signIn: builder.mutation<void, LoginArgs>({
      invalidatesTags: ['Me'],
      query: args => ({
        url: `v1/auth/login`,
        method: 'POST',
        body: args,
      }),
    }),
    signUp: builder.mutation<User, SignUpArgs>({
      query: args => ({
        url: `v1/auth/sign-up`,
        method: 'POST',
        body: args,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: `v1/auth/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useSignInMutation, useMeQuery, useSignUpMutation, useSignOutMutation } = authService
