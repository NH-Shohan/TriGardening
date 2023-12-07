import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '445566',
    database: 'Tri_Web',
    autoLoadEntities: true,
    synchronize: true,
  }),
  AuthModule,
  UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
