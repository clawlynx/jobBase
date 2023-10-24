import React from "react";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import Formrow from "../components/Formrow";
import { JOB_STATUS, JOB_TYPES } from "../../../utils/constants";
import FormRowSelect from "../components/FormRowSelect";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/jobs", data);
    toast.success("Job Added Successfully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function AddJob() {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className=" rounded w-full bg-gray-100 pt-12 pb-16 px-8">
      <Form
        method="post"
        className="m-0 rounded-none shadow-none p-0 max-w-full w-full"
      >
        <h4 className="form-title mb-8 text-3xl font-bold">Add Job</h4>
        <div className="form-center grid gap-4">
          <Formrow type="text" name="position" />
          <Formrow type="text" name="company" />
          <Formrow
            type="text"
            name="jobLocation"
            labelText="job Location"
            defaultValue={user?.location}
          />
          <FormRowSelect
            labelText="Job Status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            defaultValue={JOB_TYPES.FULL_TIME}
            list={Object.values(JOB_TYPES)}
          />
          <button
            type="submit"
            className="btn-primary form-btn mt-4 "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting.." : "Submit"}
          </button>
        </div>
      </Form>
    </section>
  );
}
