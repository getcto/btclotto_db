import { IsInt, IsString } from 'class-validator';

export class UserEntryInput {
  @IsInt()
  userId: number;

  @IsInt()
  sessionId: number;

  @IsString()
  total_ticket: string;
}