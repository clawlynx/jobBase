import React from "react";
import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Formrow from "../components/Formrow";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("Image size too large");
    return null;
  }
  try {
    await axios.patch("/api/v1/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

export default function Profile() {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className=" rounded w-full bg-gray-100 pt-12 pb-16 px-8">
      <Form
        method="post"
        className="m-0 rounded-none shadow-none p-0 max-w-full w-full"
        encType="multipart/form-data"
      >
        <h4 className="form-title mb-8 text-3xl font-bold">Profile</h4>
        <div className="form-center grid gap-4">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image (max: 0.5MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            ></input>
          </div>
          <Formrow type="text" name="name" defaultValue={name} />
          <Formrow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue={lastName}
          />
          <Formrow type="email" name="email" defaultValue={email} />
          <Formrow type="text" name="location" defaultValue={location} />
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
