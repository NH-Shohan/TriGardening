import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/admin.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'TriGardening',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
    ProductModule,
    VideoModule,
    ReviewModule,
  ],
})
export class AppModule {}
