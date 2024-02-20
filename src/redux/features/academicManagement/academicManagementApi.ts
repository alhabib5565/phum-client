import baseApi from "../../baseApi";


const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        academicSemester: builder.query({
            query: () => ({
                url: '/academic-semesters',
                method: 'GET'
            })
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