import { Body, Controller, Get, Param, Post, Put, Req, Res, Session, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto, LoginDTO, UpdateProductDto, signUpDTO } from './admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";

@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('index')
  getHello(): string {
    return this.adminService.getHello();
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  SignUp(@Body() data: signUpDTO): any {
    return this.adminService.SignUp(data);
  }
 
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginDTO, @Session() session) {
    const user = await this.adminService.login(data);
    console.log(user);
  
    if (user) {
      const identifier = user.email ? user.email : user.phone;
     // session.email = user.email; // Store email in the session if available
  
      return { message: 'Success login', identifier };
    } else {
      return { message: 'Invalid login' };
    }
  }



  @Post('addproducts')
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type: Only JPG, JPEG, PNG, and GIF files are allowed.'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e2);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  //@UsePipes(new ValidationPipe())
  async addProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() photos: Express.Multer.File[]) {
    // Attach the uploaded images to the DTO
    createProductDto.photos = photos.map(photo => photo.filename);
    console.log('Received data:', createProductDto);
    return this.adminService.addProduct(createProductDto);
  }

  @Put('Updateproducts/:id')
  @UsePipes(new ValidationPipe())
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.adminService.updateProduct(Number(id), updateProductDto);
  }
  
}

