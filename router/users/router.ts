import { Router } from "express";
import UserController from "../../controller/user/controller";

class ManagementRoute {
  public route: Router;
  private controller: UserController;

  constructor() {
    this.route = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/", this.controller.loginPageRendering);
    this.route.get("/register",this.controller.registerPageRendering)
    // this.route.post("/", this.controller.create);
    // this.route.get("/", this.controller.getAll);
    // this.route.get("/view/:id", this.controller.getById);
    // this.route.put("/students/:id", this.controller.update);
    // this.route.delete("/delete/:id", this.controller.delete);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default ManagementRoute;
