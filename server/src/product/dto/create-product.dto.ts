import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsObject()
  @IsNotEmpty()
  files: {
    name: string;
    url: string;
  };

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  categoryId: number;
}
