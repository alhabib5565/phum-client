import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("loging in ");
    try {
      const res = await login(data).unwrap();
      const { accessToken } = res.data;
      console.log("res", res);
      const user = verifyToken(accessToken) as TUser;
      dispatch(setUser({ user, token: accessToken }));

      toast.success("login successfull", {
        id: toastId,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const defaultValues = {
    userId: "A-0002",
    password: "admin123",
  };

  return (
    <Row justify={"center"} align="middle" style={{ height: "100vh" }}>
      <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
        <PHInput type="text" name="userId" label="ID" />
        <PHInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
