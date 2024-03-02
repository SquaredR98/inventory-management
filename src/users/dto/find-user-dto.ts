import { IsNotEmpty, IsOptional } from "class-validator";

export class FindUserDto {
  @IsNotEmpty()
  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsOptional()
  email: string;
}