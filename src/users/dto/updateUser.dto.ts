//updateuserdto 
import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsString()
  @IsNotEmpty()
  twitter_handle: string;

  @IsString()
  @IsNotEmpty()
  twitter_pic: string;
}