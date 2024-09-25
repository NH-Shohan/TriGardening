import { Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, CreateProductDto, LoginDTO, UpdateCategoryDto, UpdateProductDto, signUpDTO } from './admin.dto';
import { Repository } from 'typeorm';
import { AdminEntity} from './admin.entity';
import { ProductEntity } from './products.entity';
import { CategoryEntity } from './category.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  getHello(): string {
    return 'Hello  Tri!.....';
  }
  async SignUp(signUpDto: signUpDTO): Promise<AdminEntity> {
    let existingUser: AdminEntity | undefined;
  
    // Check if either email or phone already exists
    if (signUpDto.email) {
      existingUser = await this.adminRepository.findOne({ where: { email: signUpDto.email } });
      if (existingUser) {
        
        throw new UnauthorizedException(`A user with ${existingUser.email} already exists`);
      }
    } 
    if (signUpDto.phone) {
      existingUser = await this.adminRepository.findOne({ where: { phone: signUpDto.phone.toString() } });
      if (existingUser) {
        
        throw new UnauthorizedException(`A user with ${existingUser.phone} already exists`);
      }
    }
  
    // if (existingUser) {
    //   const identifier = existingUser.email ? `email ${existingUser.email}` : `phone ${existingUser.phone}`;
    //   throw new NotFoundException(`A user with ${identifier} already exists`);
    // }
  
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpDto.password, saltRounds);
  
    // Create an instance of UserEntity
    const user = new AdminEntity();
    user.name = signUpDto.name;
    user.email = signUpDto.email;
    user.phone = signUpDto.phone ? signUpDto.phone.toString() : undefined; // Convert to string if phone is provided
    user.password = hashedPassword;
    user.photo = signUpDto.photo;
  
    // Save the user entity
    return this.adminRepository.save(user);
  }
  
  async login(data: LoginDTO): Promise<AdminEntity | null> {
    let user: AdminEntity| undefined;
  
    if (data.email) {
      // Login using email
      user = await this.adminRepository.findOne({ where: { email: data.email } });
    } else if (data.phone) {
      // Login using phone number
      user = await this.adminRepository.findOne({ where: { phone: data.phone } });
    }
  
    if (!user) {
      return null; // User not found
    }
  
    const passwordMatch = await bcrypt.compare(data.password, user.password);
  
    if (passwordMatch) {
      return user; // Return user data upon successful login
    } else {
      return null; // Password doesn't match
    }
  }
  



  async addProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = createProductDto.name;
    product.image = createProductDto.image;
    product.details = createProductDto.details;
    product.date = createProductDto.date;
    product.status = createProductDto.status;
    product.photos = JSON.stringify(createProductDto.photos);
  
    // Fetch category by ID and assign to product
    const category = await this.categoryRepository.findOne({ where: { id: createProductDto.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    product.category = category;
  
    // Save the product to the database
    const savedProduct = await this.productRepository.save(product);
    return savedProduct;
  }
  

  async updateProduct(productId: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  
    // Update fields if provided
    if (updateProductDto.name) product.name = updateProductDto.name;
    if (updateProductDto.image) product.image = updateProductDto.image;
    if (updateProductDto.details) product.details = updateProductDto.details;
    if (updateProductDto.date) product.date = updateProductDto.date;
    if (updateProductDto.status) product.status = updateProductDto.status;
    if (updateProductDto.photos) product.photos = JSON.stringify(updateProductDto.photos);
  
    // Update category if provided
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }
  
    return await this.productRepository.save(product);
  }
  

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.name = createCategoryDto.name;
    return await this.categoryRepository.save(category);
  }
  
  async updateCategory(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
  
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  
    // Update fields if provided
    if (updateCategoryDto.name) category.name = updateCategoryDto.name;
  
    return await this.categoryRepository.save(category);
  }
  
}

  