import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  categoryId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['visible', 'hidden'])
  status?: string;
}
