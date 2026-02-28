import mongoose, { Document, Schema, Model } from "mongoose";

export interface UserDoc extends Document {
  username: string;
  email: string;
  phone?: string;
  password: string;
  profilePicture?: string;
  statusMessage?: string;
  isOnline: boolean;
  lastSeen?: Date;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  createdAt : Date;
  updatedAt :Date;


  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDoc>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    statusMessage: {
      type: String,
      default: "Hey there! I am using ChatApp",
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);


export const userModel = mongoose.model<UserDoc>("user", userSchema);