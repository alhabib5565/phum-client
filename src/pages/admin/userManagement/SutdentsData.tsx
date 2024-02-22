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

const SutdentsData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
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
  const data = studentData?.data?.map(({ fullName, _id, id }) => ({
    _id,
    key: _id,
    fullName,
    id,
  }));

  type TData = Pick<TStudents, "fullName" | "id" | "_id">;

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
      // defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "X",
      render: () => {
        return (
          <Space>
            <Button>Update</Button>
            <Button>Delete</Button>
            <Button>Block</Button>
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
      ;
    </>
  );
};

export default SutdentsData;
