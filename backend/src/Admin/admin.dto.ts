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

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  stock: number;

  @IsOptional()
  photo?: string;
}

// update-product.dto.ts

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  stock?: number;

  @IsOptional()
  photo?: string;
}


