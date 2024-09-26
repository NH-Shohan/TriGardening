import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsUrl()
  avatar: string;
}
