import { Input } from "antd";
import { Controller } from "react-hook-form";

type TPHInput = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TPHInput) => {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && label}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHInput;
