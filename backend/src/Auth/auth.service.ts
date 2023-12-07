import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

  getHello(): string {
    return 'Hello  Tri!.....';
    
  }
  async findOrCreateGoogleUser(name: string, email: string, picture: string): Promise<UserEntity | null> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
  
    if (existingUser) {
      return existingUser;
    }
  
    const newUser = this.userRepository.create({
      name: name,
      email:email,
      photo: picture,
      // Add other fields as needed
    });
  
    return this.userRepository.save(newUser);
  }
}