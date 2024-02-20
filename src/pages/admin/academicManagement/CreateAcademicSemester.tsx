import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../shcema/academicManagement.schema";
import { semesterOptions } from "../../../constant/semester";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/academicManagement/academicManagementApi";
import { toast } from "sonner";

const year = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(year + number),
  label: String(year + number),
}));

const CreateAcademicSemester = () => {
  const [createAcademicSemister] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const semesterData = {
        name: semesterOptions[Number(data.name) - 1]?.label,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };
      const res = await createAcademicSemister(semesterData);
      console.log(res, "res");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      console.log(error, "error");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect option={semesterOptions} name={"name"} label={"Name"} />
          <PHSelect option={yearOptions} name={"year"} label={"Year"} />
          <PHSelect
            option={monthOptions}
            name={"startMonth"}
            label={"Start Month"}
          />
          <PHSelect
            option={monthOptions}
            name={"endMonth"}
            label={"End Month"}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
