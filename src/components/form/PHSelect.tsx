import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSeletProps = {
  label: string;
  name: string;
  option: { value: string; label: string }[] | undefined;
  disabled?: boolean;
};

const PHSelect = ({ label, name, option, disabled }: TSeletProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            disabled={disabled}
            size="large"
            style={{ minWidth: "200px", width: "100%" }}
            {...field}
            options={option}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
