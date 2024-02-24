import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { semesterStatusOptions } from "../../../constant/semester";
import { useSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi";

const SemesterRegistration = () => {
  const defaultValues = {
    academicSemester: "65b0104110b74fcbd7a25d92",
    status: "UPCOMING",

    minCredit: 6,
    maxCredit: 16,
  };

  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllAcademicSemesterQuery(undefined);
  const [semesterRegistration] = useSemesterRegistrationMutation();

  const academicSemesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    semesterRegistration(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            option={academicSemesterOptions}
            disabled={semesterLoading}
          />

          <PHSelect
            name="status"
            label="Status"
            option={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
