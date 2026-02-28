      


import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"
import UserService from "../../service/userService";
import ResponseHandler from "../../utiles/responces"

export default class StudentController {
  private service: UserService;
  
  constructor(service: UserService) {
    this.service = service;
  }

  

  create = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const existingEmail = await this.service.existingEmail(req.body.email)
      if(existingEmail){
        console.log(`exting `)
        return ResponseHandler.sendError(res,`This email already existing`,404)
      }
      console.log(`sjfnjsdbfjhbdsx`)
      const student = await this.service.createUser(req.body);
      ResponseHandler.sendSuccess(res, student, 201);  
    } catch (error: any) {
      console.error("Error creating student:", error);
      next(error);
    }
  };

   getLoginPage = async ( req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("frontend/loginPage");          
    } catch (error: any) {
      console.error("Error fetching students:", error);
      next(error);
    }            
  };
  getRegiterPage = async(req:Request ,res:Response, next:NextFunction) =>{
    try {
        res.render("frontend/register")
    } catch (error:any ) {
        console.log(`error in the register : ${error}`);
        next(error);
    }
  }          

}
