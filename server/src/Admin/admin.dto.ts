import {
  IsEmail,IsNotEmpty,IsNumber,IsOptional,IsString,Matches,Min,MinLength,ValidateIf,} from 'class-validator';


  export class signUpDTO {
  @IsString({ message: 'enter name' })
  @Matches(/^[a-zA-Z- ]+$/, { message: 'Name must be A_z' })
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'enter a valid email' })
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'Invalid mobile number format' })
  @ValidateIf((object, value) => value !== undefined) // Validate only if value is provided
  phone: string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password is minimum 4 characters' })
  password: string;
  photo: string;
}

export class LoginDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'Invalid mobile number format' })
  phone?: string;

  @IsNotEmpty()
  password: string;
}

// create-product.dto.ts



export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Image URL must be a string' })
  image: string;

  @IsString({ message: 'Details must be a string' })
  details: string;

  @IsString({ message: 'Status must be a string' })
  status: string;

  @IsOptional()
  @IsString({ message: 'Date must be a string' })
  date: string;

  @IsOptional()
  photos?: string[];

  @IsNotEmpty({ message: 'Category ID is required' })
  @IsNumber({}, { message: 'Category ID must be a number' })
  categoryId: number;
}
export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'Category name must be a string' })
  name?: string;
}

// update-product.dto.ts
export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Details must be a string' })
  details?: string;

  @IsOptional()
  @IsString({ message: 'Date must be a string' })
  date?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;

  @IsOptional()
  photos?: string[];

  @IsOptional()
  @IsNumber({}, { message: 'Category ID must be a number' })
  categoryId?: number;
}


