import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../User/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google.strategy";

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
      
    ],
    controllers: [AuthController],
    providers: [AuthService,GoogleStrategy],
    //exports: [UserService, TypeOrmModule.forFeature([UserEntity])], // Add this line to export UserService and UserEntityRepository
  })
  export class AuthModule {}