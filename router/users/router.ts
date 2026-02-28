import { Router } from "express";
import UserController from "../../controller/user/controller";
import UserService from "../../service/userService";
import UserRepository from "../../respositories/userRespository";

 class ManagementRoute {
  public route: Router;   
  private repo: UserRepository;
  private service: UserService;
  private controller: UserController;

  constructor() {
    this.route = Router();
    this.repo = new UserRepository();
    this.service = new UserService(this.repo);
    this.controller = new UserController(this.service);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/register", this.controller.create);
    this.route.get("/", this.controller.getLoginPage);
    this.route.get("/register", this.controller.getRegiterPage);

  }
   public getRouter(): Router {
    return this.route; 
  }
}

export default ManagementRoute