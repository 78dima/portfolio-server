import { IsNotEmpty } from 'class-validator';

export class CreateContactmeDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly subject: string;
  @IsNotEmpty()
  readonly message: string;
}
