import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../shcema/academicManagement.schema";
import { semesterOptions } from "../../../constant/semester";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";

const year = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(year + number),
  label: String(year + number),
}));

const CreateAcademicSemester = () => {
  const [createAcademicSemister] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("pending...");
    try {
      const semesterData = {
        name: semesterOptions[Number(data.name) - 1]?.label,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };
      const res = await createAcademicSemister(semesterData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
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
