import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('index')
  getHello(): string {
    return this.authService.getHello();
  }
 
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    console.log('Executing Google Login Middleware');
  }
  

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const { accessToken } = req.user;
    const userEmail = req.user.email;
    if (userEmail) {
       // Assuming 'email' is a property in your UserEntity
  
      // Redirect to the client's URL with the user's email as a query parameter
      res.redirect(`http://localhost:3000/?userEmail=${userEmail}`);
    } else {
      // Handle the case where no access token is available
      res.redirect(`http://localhost:3000/user/index`);
    }
  }
}