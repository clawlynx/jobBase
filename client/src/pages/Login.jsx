import React from "react";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Formrow from "../components/Formrow";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/auth/login", data);
    toast.success("Login Successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function Login() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const loginDemoUser = async () => {
    const data = {
      email: "demouser@gmail.com",
      password: "secret123",
    };
    try {
      await axios.post("/api/v1/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="min-h-screen grid items-center">
      <Form method="post" className="form max-w-md border-t-4 border-primary">
        <div className="flex items-center justify-center gap-5 my-0 mx-auto mb-5">
          <img src="main.png" className=" w-14 h-14" alt="image"></img>
          <h1 className=" text-primary text-3xl font-bold">JobBase</h1>
        </div>
        <h4 className="text-center text-xl mb-5">Login</h4>
        <Formrow type={"email"} name={"email"} />
        <Formrow type={"password"} name={"password"} />
        <button
          type="submit"
          className=" btn-primary py-2 px-3 w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "Submit"}
        </button>
        <button
          type="button"
          className="btn-primary py-2 px-3 w-full mt-4"
          onClick={loginDemoUser}
        >
          Explore the App
        </button>
        <p className=" mt-4 text-center leading-normal">
          Not a member yet?
          <Link to={"/register"} className=" text-primary ml-1">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
}
