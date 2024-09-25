import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  AdminModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
