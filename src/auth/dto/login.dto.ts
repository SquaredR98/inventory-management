import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  authId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}