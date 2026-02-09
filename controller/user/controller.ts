 class UserController{
   
    loginPageRendering(req:any,res:any){
        console.log(`bdsbdsbvb`)
        res.render("frontend/loginPage")
    }
    registerPageRendering(req:any,res:any){
        res.render("frontend/register") 
    }


}


export default  UserController
      