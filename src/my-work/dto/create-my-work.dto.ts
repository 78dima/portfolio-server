import { IsNotEmpty } from 'class-validator';

export class CreateMyWorkDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly link: string;
  readonly imageSrc: string;
}
