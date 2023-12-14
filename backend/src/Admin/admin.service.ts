import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, LoginDTO, UpdateProductDto, signUpDTO } from './admin.dto';
import { Repository } from 'typeorm';
import { AdminEntity} from './admin.entity';
import { ProductEntity } from './products.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
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
    // Map properties from DTO to the entity
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    product.photos = JSON.stringify(createProductDto.photos); // Serialize array to JSON // Assuming photos is an array

    // Save the product to the database
    const savedProduct = await this.productRepository.save(product);
    return savedProduct;
  }

  // async getProduct(productId: number): Promise<Product | undefined> {
  //   return this.productRepository.findOne(productId);
  // }

  // Implement other business logic for your product service as needed


  async updateProduct(productId: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new UnauthorizedException(`Product with ID ${productId} not found`);
    }

    // Update the product entity
    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }
}

  