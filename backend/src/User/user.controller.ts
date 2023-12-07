import { Body, Controller, Get, Post, Req, Res, Session, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO, signUpDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('index')
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  SignUp(@Body() data: signUpDTO): any {
    return this.userService.SignUp(data);
  }
 
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginDTO, @Session() session) {
    const user = await this.userService.login(data);
    console.log(user);
  
    if (user) {
      const identifier = user.email ? user.email : user.phone;
     // session.email = user.email; // Store email in the session if available
  
      return { message: 'Success login', identifier };
    } else {
      return { message: 'Invalid login' };
    }
  }
  
}

