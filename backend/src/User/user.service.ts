import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, signUpDTO } from './user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

  getHello(): string {
    return 'Hello  Tri!.....';
  }
  async SignUp(signUpDto: signUpDTO): Promise<UserEntity> {
    let existingUser: UserEntity | undefined;
  
    // Check if either email or phone already exists
    if (signUpDto.email) {
      existingUser = await this.userRepository.findOne({ where: { email: signUpDto.email } });
      if (existingUser) {
        
        throw new NotFoundException(`A user with ${existingUser.email} already exists`);
      }
    } 
    if (signUpDto.phone) {
      existingUser = await this.userRepository.findOne({ where: { phone: signUpDto.phone.toString() } });
      if (existingUser) {
        
        throw new NotFoundException(`A user with ${existingUser.phone} already exists`);
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
    const user = new UserEntity();
    user.name = signUpDto.name;
    user.email = signUpDto.email;
    user.phone = signUpDto.phone ? signUpDto.phone.toString() : undefined; // Convert to string if phone is provided
    user.password = hashedPassword;
    user.photo = signUpDto.photo;
  
    // Save the user entity
    return this.userRepository.save(user);
  }
  
  async login(data: LoginDTO): Promise<UserEntity | null> {
    let user: UserEntity | undefined;
  
    if (data.email) {
      // Login using email
      user = await this.userRepository.findOne({ where: { email: data.email } });
    } else if (data.phone) {
      // Login using phone number
      user = await this.userRepository.findOne({ where: { phone: data.phone } });
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
  

  }
