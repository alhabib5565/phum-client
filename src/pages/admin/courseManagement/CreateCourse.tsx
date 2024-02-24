import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { TPreRequisiteCourses } from "../../../type";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { TResponse } from "../../../type/gobal";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item: TPreRequisiteCourses) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await createCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  const defaultValues = {
    title: "Dom Manipulation",
    prefix: "JS",
    code: 108,
    credits: 3,
    isDeleted: false,
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            option={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
