import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Podcast } from 'src/podcast/entity/podcast.entity';

export enum UserRole {
  Listener = 'Listener',
  Owner = 'Owner',
}

@ObjectType()
export class User extends CoreEntity {
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field((type) => [Podcast])
  podcasts: Podcast[];
}
