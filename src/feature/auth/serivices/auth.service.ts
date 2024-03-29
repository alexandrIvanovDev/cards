import { baseApi } from '@/app/providers/store/base-api.ts'
import {
  CreateNewPassword,
  LoginArgs,
  RecoverPasswordArgs,
  SignUpArgs,
  User,
} from '@/feature/auth/serivices/auth.types.ts'

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
      extraOptions: { maxRetries: 1 },
      providesTags: ['Me'],
    }),
    updateUser: builder.mutation<User, FormData>({
      query: args => ({
        url: `v1/auth/me`,
        method: 'PATCH',
        body: args,
      }),
      invalidatesTags: ['Me'],
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
    recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
      query: args => ({
        url: `v1/auth/recover-password`,
        method: 'POST',
        body: {
          email: args.email,
          html: '<h1>Hi, ##name##</h1><p>Click <a href="https://cards-seven-iota.vercel.app/create-new-password/##token##">here</a> to recover your password</p>',
        },
      }),
    }),
    createNewPassword: builder.mutation<void, CreateNewPassword>({
      query: ({ token, password }) => ({
        url: `v1/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
})

export const {
  useSignInMutation,
  useMeQuery,
  useSignUpMutation,
  useSignOutMutation,
  useUpdateUserMutation,
  useRecoverPasswordMutation,
  useCreateNewPasswordMutation,
} = authService
