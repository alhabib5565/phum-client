import PHForm from "../../../components/form/PHForm";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import { Controller, FieldValues } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagementApi";

const CreateFaculty = () => {
  /**
 * {
    "password": "faculty123",
    "faculty": {
        "designation":"Lecturer",
        "name": {
            "firstName": "Mridul ",
            "middleName": "Das",
            "lastName": "Rahman"
        },
        "gender":"male",
        "dateOfBirth": "1990-01-01",
        "bloogGroup": "A+",

        "email":"faculty3@gmail.com",
        "contactNo": "123",
        "emergencyContactNo": "123",
        "presentAddress": "123 Main St, Cityville",
        "permanentAddress": "456 Oak St, Townsville",
        "academicDepartment":"65b00fb010b74fcbd7a25d8e"
    }
}
 */

  const defaultValues = {
    designation: "Lecturer",
    name: {
      firstName: "Mridul ",
      middleName: "Das",
      lastName: "Rahman",
    },
    gender: "male",
    bloogGroup: "A+",

    email: "faculty3@gmail.com",
    contactNo: "123",
    emergencyContactNo: "123",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    academicDepartment: "65b00fb010b74fcbd7a25d8e",
  };
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const [createFaculty] = useCreateFacultyMutation();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    createFaculty(formData);
  };
  return (
    <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <Row gutter={8}>
        <Divider>Personal Info</Divider>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="name.firstName" label="First Name" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="name.middleName" label="Middle Name" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="name.lastName" label="Last Name" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="designation" label="Designation" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <Controller
            name="image"
            render={({ field: { onChange, value } }) => (
              <Form.Item label="Profile Image">
                <Input
                  value={value?.fileName}
                  onChange={(e) => onChange(e.target?.files?.[0])}
                  type="file"
                />
              </Form.Item>
            )}
          />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHSelect option={genderOptions} name="gender" label="Gender" />
        </Col>

        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHSelect
            option={bloodGroupOptions}
            name="bloogGroup"
            label="BloodGroup"
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Divider>Contact Info</Divider>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="email" name="email" label="Email" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="contactNo" label="Contact No" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="emergencyContactNo"
            label="Emergency Contact No"
          />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="presentAddress" label="Present Address" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="permanentAddress"
            label="Permanent Address"
          />
        </Col>
      </Row>
      <Row>
        <Divider>Academic Info</Divider>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHSelect
            disabled={departmentLoading}
            option={departmentOptions}
            name="academicDepartment"
            label="Academic Department"
          />
        </Col>
      </Row>
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateFaculty;
