import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSeletProps = {
  label: string;
  name: string;
  option: { value: string; label: string }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  setOnChangeValue: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
  label,
  name,
  option,
  disabled,
  mode,
  setOnChangeValue,
}: TSeletProps) => {
  const { control } = useFormContext();
  const value = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setOnChangeValue(value);
  }, [value, setOnChangeValue]);
  console.log(value);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
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

export default PHSelectWithWatch;
