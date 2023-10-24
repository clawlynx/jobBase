import axios from "axios";
import React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/v1/jobs/${params.id}`);
    toast.success("Job Deleted Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

function DeleteJob() {
  return <div>DeleteJob</div>;
}

export default DeleteJob;
