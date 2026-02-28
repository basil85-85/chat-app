import { UserDoc,userModel } from "../model/userSchema";
import { UserRequest,UserResponse } from "../dtos/user.dto";
import { Types } from "mongoose"

export default class StudentRepository {
  async create(user: UserRequest): Promise<UserResponse> {
    const newUser: UserDoc = new userModel(user);
    const saved = await newUser.save();
    return this.toResponse(saved);
  }
   async existingEmail(email: string): Promise<boolean> {
    const student = await userModel.findOne({ email }).lean();
    return !!student;
  }
   private toResponse(user: UserDoc): UserResponse {
    return {
      id: user._id.toString(),
    username: user.username,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture,
    statusMessage: user.statusMessage,
    isOnline: user.isOnline,
    lastSeen: user.lastSeen,
    followersCount: user.followers?.length || 0,
    followingCount: user.following?.length || 0,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    };
  }
}