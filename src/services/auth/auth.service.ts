import { baseApi } from '@/app/providers/store/base-api.ts'
import { SignUpArgs, LoginArgs, User } from '@/services/auth/auth.types.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
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
    me: builder.query<User, void>({
      query: () => `v1/auth/me`,
      providesTags: ['Me'],
    }),
  }),
})

export const { useSignInMutation, useMeQuery, useSignUpMutation } = authService
