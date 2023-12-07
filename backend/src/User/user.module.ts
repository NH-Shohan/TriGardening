// user.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  // Add this line to export UserService and UserEntityRepository
})
export class UserModule {}
