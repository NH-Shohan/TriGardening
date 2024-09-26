import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateProductDto,
  LoginDTO,
  UpdateCategoryDto,
  UpdateProductDto,
  signUpDTO,
} from './admin.dto';

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminService } from './admin.service';

@Controller('admin')
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
  async login(@Body() data: LoginDTO) {
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

  @Post('addpost')
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(
            new Error(
              'Invalid file type: Only JPG, JPEG, PNG, and GIF files are allowed.',
            ),
            false,
          );
        }
      },
      limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e2);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async addProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    createProductDto.photos = photos.map((photo) => photo.filename);
    return this.adminService.addProduct(createProductDto);
  }

  @Put('updatePost/:id')
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    if (photos && photos.length > 0) {
      updateProductDto.photos = photos.map((photo) => photo.filename);
    }
    return this.adminService.updateProduct(Number(id), updateProductDto);
  }
  @Post('addCategory')
  @UsePipes(new ValidationPipe())
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.addCategory(createCategoryDto);
  }

  @Put('updateCategory/:id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.adminService.updateCategory(Number(id), updateCategoryDto);
  }
}
