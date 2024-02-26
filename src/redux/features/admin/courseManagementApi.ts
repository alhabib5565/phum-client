import { TCourse, TSemester, } from "../../../type";
import { TQueryParams, TResponse } from "../../../type/gobal";
import baseApi from "../../baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        semesterRegistration: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['semester']
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['semester'],
        }),
        getRegisteredSemester: builder.query({
            query: (args) => {
                const searchParams = new URLSearchParams()
                if (args) {
                    args.forEach((arg: TQueryParams) => searchParams.append(arg.name, arg.value as string))
                }
                return {
                    url: '/semester-registrations',
                    params: searchParams
                }
            },
            providesTags: ['semester'],
            transformResponse: (response: TResponse<TSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['courses'],
            transformResponse: (response: TResponse<TCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/create-course`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['courses'],
        }),
        addFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: 'PUT',
                body: args.data,
            }),
            invalidatesTags: ['courses'],
        }),
        getCourseFaculties: builder.query({
            query: (id) => {
                return {
                    url: `/courses/${id}/get-faculties`,
                    method: 'GET',
                };
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponse<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        createOfferedCourse: builder.mutation({
            query: (data) => ({
                url: `offered-courses/create-offered-course`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['courses'],
        }),
    })
})

export const { useSemesterRegistrationMutation, useGetRegisteredSemesterQuery, useUpdateRegisteredSemesterMutation, useAddCourseMutation, useGetAllCoursesQuery, useAddFacultiesMutation, useGetCourseFacultiesQuery, useCreateOfferedCourseMutation } = courseManagementApi