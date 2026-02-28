import { UserRequest, UserResponse } from "../dtos/user.dto";
import StudentRepository from "../respositories/userRespository";
import {Request,Response,NextFunction} from "express"
export default class StudentService {
  private repo: StudentRepository;

  constructor(repo: StudentRepository) {
    this.repo = repo; 
  }

  async createUser(data: UserRequest): Promise<UserResponse> {
    console.log(data)
    return await this.repo.create(data);
  }
    async existingEmail(email: string): Promise<boolean | null> {
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return null; 
  }
  return await this.repo.existingEmail(email);
  }
}
