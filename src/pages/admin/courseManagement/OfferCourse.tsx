import { Button, Col, Flex } from "antd";
import { bloodGroupOptions } from "../../../constant/global";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";

const OfferCourse = () => {
  const [onChangeValue, setOnChangeValue] = useState("");
  console.log(onChangeValue, "from offercourse");
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            option={bloodGroupOptions}
            setOnChangeValue={setOnChangeValue}
          />

          <PHInput
            disabled={!onChangeValue}
            type="text"
            name="maxCredit"
            label="Max Credit"
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
