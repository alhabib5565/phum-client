import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagementApi";

const CreateStudent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const studnet = {
    password: "student123",

    student: {
      name: {
        firstName: "I am",
        middleName: "Student",
        lastName: "Number 1",
      },
      gender: "male",
      dateOfBirth: "1990-01-01",
      bloogGroup: "A+",

      email: "student2@gmail.com",
      contactNo: "1235678",
      emergencyContactNo: "987-654-3210",
      presentAddress: "123 Main St, Cityville",
      permanentAddress: "456 Oak St, Townsville",

      guardian: {
        fatherName: "James Doe",
        fatherOccupation: "Engineer",
        fatherContactNo: "111-222-3333",
        motherName: "Mary Doe",
        motherOccupation: "Teacher",
        motherContactNo: "444-555-6666",
      },
      localGuardian: {
        name: "Alice Johnson",
        occupation: "Doctor",
        contactNo: "777-888-9999",
        address: "789 Pine St, Villageton",
      },

      admissionSemester: "65b0104110b74fcbd7a25d92",
      academicDepartment: "65b00fb010b74fcbd7a25d8e",
    },
  };

  const defaultValues = {
    name: {
      firstName: "I am",
      middleName: "Student",
      lastName: "Number 1",
    },
    gender: "male",
    bloogGroup: "A+",

    email: "student2@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },
    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },

    admissionSemester: "65b0104110b74fcbd7a25d92",
    academicDepartment: "65b00fb010b74fcbd7a25d8e",
  };

  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllAcademicSemesterQuery(undefined);
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const [createStudent] = useCreateStudentMutation();

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studnetData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studnetData));
    formData.append("file", data.image);
    createStudent(formData);
    console.log(data);
  };
  return (
    <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <Button>create Department</Button>
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
        <Divider>Personal Info</Divider>
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
      <Row gutter={8}>
        <Divider>Guardian Info</Divider>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="guardian.fatherName" label="Father Name" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="guardian.fatherOccupation"
            label="Father Occupation"
          />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="guardian.fatherContactNo"
            label="Father Contact No"
          />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="guardian.motherName" label="Mother Name" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="guardian.motherOccupation"
            label="Mother Occupation"
          />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="guardian.motherContactNo"
            label="Mother Contact No"
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Divider>Local Guardian Info</Divider>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="localGuardian.name" label=" Name" />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="localGuardian.occupation"
            label=" Occupation"
          />
        </Col>

        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput
            type="text"
            name="localGuardian.contactNo"
            label=" Contact No"
          />
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHInput type="text" name="localGuardian.address" label=" Address" />
        </Col>
      </Row>
      <Row gutter={8}>
        <Divider>Academic Info</Divider>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHSelect
            disabled={semesterLoading}
            option={semesterOptions}
            name="admissionSemester"
            label="Admission Semester"
          />
        </Col>
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

export default CreateStudent;
