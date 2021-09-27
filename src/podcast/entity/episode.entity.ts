import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Podcast } from './podcast.entity';

@ObjectType()
export class Episode extends CoreEntity {
  @Field((type) => String)
  @IsString()
  @MinLength(4)
  title: string;

  @Field((type) => String)
  @IsString()
  category: string;

  @Field((type) => Podcast)
  podcast: Podcast;
}
