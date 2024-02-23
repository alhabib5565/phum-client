import { TStudents } from "../../../type";
import { TQueryParams, TResponse } from "../../../type/gobal";
import baseApi from "../../baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation({
            query: (studnetData) => ({
                url: '/users/create-student/',
                method: 'POST',
                body: studnetData

            })
        }),
        createFaculty: builder.mutation({
            query: (studnetData) => ({
                url: '/users/create-faculty',
                method: 'POST',
                body: studnetData

            })
        }),
        getStudents: builder.query({
            query: (args) => {
                console.log(args, 'from api')
                const searchParams = new URLSearchParams()
                if (args) {
                    args.forEach((arg: TQueryParams) => searchParams.append(arg.name, arg.value as string))
                }
                return {
                    url: '/students',
                    method: 'GET',
                    params: searchParams
                }
            },
            transformResponse: (response: TResponse<TStudents[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }

        }),
    })
})

export const { useCreateStudentMutation, useGetStudentsQuery, useCreateFacultyMutation } = userManagementApi