import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHInput = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TPHInput) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <Controller
        name={name}
        disabled={disabled}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
