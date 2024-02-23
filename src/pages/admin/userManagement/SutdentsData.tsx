import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../type/gobal";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { TStudents } from "../../../type";
import { Link } from "react-router-dom";
import MyModal from "../../../components/modal/MyModal";

const SutdentsData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: studentData } = useGetStudentsQuery([
    {
      name: "limit",
      value: limit,
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "id",
    },
    ...params,
  ]);
  const data = studentData?.data?.map(
    ({ fullName, _id, id, contactNo, email }) => ({
      _id,
      key: _id,
      fullName,
      id,
      contactNo,
      email,
    })
  );

  type TData = Pick<
    TStudents,
    "fullName" | "id" | "_id" | "email" | "contactNo"
  >;
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const columns: TableColumnsType<TData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Student ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Actions",
      key: "X",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item._id}`}>
              <Button>Details</Button>
            </Link>
            <Button>Delete</Button>
            <Button onClick={handleModalOpen}>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TData>["onChange"] = (pagination, filters) => {
    console.log("params", filters);
    const queryParams: TQueryParams[] = [];
    filters.name?.forEach((name) =>
      queryParams.push({
        name: "name",
        value: name,
      })
    );
    filters.year?.forEach((year) =>
      queryParams.push({
        name: "year",
        value: year,
      })
    );
    setParams(queryParams);
    console.log(queryParams);
  };

  const meta = studentData?.meta;

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        total={meta?.total}
        pageSize={meta?.limit}
        current={page}
      />
      {isModalOpen && (
        <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <h2>Are you sure </h2>
        </MyModal>
      )}
    </>
  );
};

export default SutdentsData;
