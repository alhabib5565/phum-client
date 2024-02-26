import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHInput from "../../../components/form/PHInput";
import moment from "moment";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
  useGetRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAcademicFacultiesQuery,
  useGetAllAcademicDepartmentQuery,
} from "../../../redux/features/admin/academicManagementApi";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { weekDaysOptions } from "../../../constant/global";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetRegisteredSemesterQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  console.log(academicFacultyData, "from offer course");

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  const defaultValues = {
    section: 1,
    maxCapacity: 30,
    days: ["Mon", "Wed"],
    startTime: "12:30",
    endTime: "14:00",
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            option={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            option={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            option={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            setOnChangeValue={setCourseId}
            option={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            option={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            option={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
