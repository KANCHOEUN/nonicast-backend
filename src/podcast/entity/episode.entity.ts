import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Podcast } from './podcast.entity';

@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  @MinLength(4)
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  category: string;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes)
  @Field((type) => Podcast)
  podcast: Podcast;
}
