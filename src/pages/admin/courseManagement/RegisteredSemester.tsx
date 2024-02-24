import { Button, Dropdown, Space, Table, Tag } from "antd";
import type { MenuProps, TableProps } from "antd";
import {
  useGetRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagementApi";
import { TSemester } from "../../../type";
import moment from "moment";
import { useState } from "react";

type TData = Pick<TSemester, "startDate" | "endDate" | "status">;

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");

  const { data: registeredSemesters } =
    useGetRegisteredSemesterQuery(undefined);

  const [updateRegisterSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const data = registeredSemesters?.data?.map(
    ({ academicSemester, endDate, startDate, status, _id }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const items = [
    {
      label: "Upcoming",
      key: "UPCOMING",
    },
    {
      label: "Ongoing",
      key: "ONGOING",
    },
    {
      label: "Ended",
      key: "ENDED",
    },
  ];

  const handleUpdate: MenuProps["onClick"] = (e) => {
    const updatedStatus = {
      id: semesterId,
      data: { status: e.key },
    };
    updateRegisterSemesterStatus(updatedStatus);
    console.log(updatedStatus);
  };

  const menuProp = {
    items,
    onClick: handleUpdate,
  };

  const columns: TableProps<TData>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Dropdown menu={menuProp} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>
              Change Status
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default RegisteredSemester;
