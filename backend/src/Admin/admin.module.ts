// user.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { ProductEntity } from "./products.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity,ProductEntity]),
    PassportModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  // Add this line to export UserService and UserEntityRepository
})
export class AdminModule {}
