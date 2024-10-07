import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsObject()
  files: {
    name: string;
    url: string;
  };

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  content: string;

  categoryId: number;
}
