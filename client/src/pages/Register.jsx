import React from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Formrow from "../components/Formrow";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="min-h-screen grid items-center">
      <Form method="post" className="form max-w-md border-t-4 border-primary">
        <div className="flex items-center justify-center gap-5 my-0 mx-auto mb-5">
          <img src="main.png" className=" w-14 h-14" alt="image"></img>
          <h1 className=" text-primary text-3xl font-bold">JobBase</h1>
        </div>
        <h4 className="text-center text-xl mb-5">Register</h4>
        <Formrow type={"text"} name={"name"} />
        <Formrow type={"text"} name={"lastName"} labelText={"Last Name"} />
        <Formrow type={"text"} name={"location"} />
        <Formrow type={"email"} name={"email"} />
        <Formrow type={"password"} name={"password"} />
        <button
          type="submit"
          className="btn-primary py-2 px-3 w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p className=" mt-4 text-center leading-normal">
          Already a member?
          <Link to={"/login"} className=" text-primary ml-1">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}
