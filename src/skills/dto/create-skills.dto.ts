import { IsNotEmpty } from 'class-validator';

export class CreateSkillsDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  readonly image: string;
  @IsNotEmpty()
  readonly filters: Array<string>;
}
