import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "my city",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
);

UserSchema.methods.toSecure = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = model("User", UserSchema);

export default User;
