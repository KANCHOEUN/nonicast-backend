import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Episode } from './episode.entity';

@ObjectType()
export class Podcast extends CoreEntity {
  @Field((type) => String)
  @IsString()
  @MinLength(4)
  title: string;

  @Field((type) => String)
  @IsString()
  category: string;

  @Field((type) => String)
  @IsString()
  description: string;

  @Field((type) => Number, { nullable: true, defaultValue: 0 })
  @Min(0)
  @Max(5)
  @IsNumber()
  @IsOptional()
  rating: number;

  @Field((type) => [Episode])
  epsidoes: Episode[];
}
