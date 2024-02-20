import { useAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../type/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../type/gobal";

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[]>();
  const { data: semesterData } = useAcademicSemesterQuery(params);
  const data = semesterData?.data?.map(
    ({ name, endMonth, startMonth, _id, year }) => ({
      key: _id,
      name,
      endMonth,
      startMonth,
      year,
    })
  );
  // console.log(data, "academic semester");

  type TData = Pick<
    TAcademicSemester,
    "name" | "endMonth" | "startMonth" | "year"
  >;

  const columns: TableColumnsType<TData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      // defaultSortOrder: "descend",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
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

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default AcademicSemester;
