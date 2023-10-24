import axios from "axios";
import React from "react";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Formrow from "../components/Formrow";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPES } from "../../../utils/constants";

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/v1/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.patch(`/api/v1/jobs/${params.id}`, data);
    toast.success("Job updated successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function EditJob() {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className=" rounded w-full bg-gray-100 pt-12 pb-16 px-8">
      <Form
        method="post"
        className="m-0 rounded-none shadow-none p-0 max-w-full w-full"
      >
        <h4 className="form-title mb-8 text-3xl font-bold">Edit Job</h4>
        <div className="form-center grid gap-4">
          <Formrow type="text" name="position" defaultValue={data.position} />
          <Formrow type="text" name="company" defaultValue={data.company} />
          <Formrow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={data.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={data.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={data.jobType}
            list={Object.values(JOB_TYPES)}
          />
          <button
            type="submit"
            className="btn-primary form-btn mt-4 "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </section>
  );
}
