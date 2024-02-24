import { Button, Modal, Table, TableProps } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  type TData = {
    title: string;
    code: string;
  };
  const columns: TableProps<TData>["columns"] = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
      width: "1%",
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

export default Courses;

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data: FieldValues) => {
    const facultiesData = {
      courseId: facultyInfo.key,
      data,
    };
    addFaculties(facultiesData);
    console.log(facultiesData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculties</Button>
      <Modal
        title="Add Faculties"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="faculties"
            label="Faculties"
            mode="multiple"
            option={facultiesOption}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};
