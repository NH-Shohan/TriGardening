import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches,MinLength, ValidateIf } from "class-validator";
export class signUpDTO{
   
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
      
    
