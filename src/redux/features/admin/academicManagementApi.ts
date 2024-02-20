import { TAcademicSemester } from "../../../type/academicManagement.type";
import { TQueryParams, TResponse } from "../../../type/gobal";
import baseApi from "../../baseApi";


const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        academicSemester: builder.query({
            query: (args) => {
                console.log(args, 'from api')
                const searchParams = new URLSearchParams()
                if (args) {
                    args.forEach((arg: TQueryParams) => searchParams.append(arg.name, arg.value as string))
                }
                console.log(searchParams.getAll("name"), 'searchParams'); // ["api"]
                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: searchParams
                }
            },
            transformResponse: (response: TResponse<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }

        }),
        createAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useAcademicSemesterQuery, useCreateAcademicSemesterMutation } = academicManagementApi