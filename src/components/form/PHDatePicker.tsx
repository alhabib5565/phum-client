import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TPHDatePicker = {
  label: string;
  name: string;
  disabled?: boolean;
};

const PHDatePicker = ({ label, name, disabled }: TPHDatePicker) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <DatePicker
            {...field}
            disabled={disabled}
            style={{ width: "100%" }}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default PHDatePicker;
