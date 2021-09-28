import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Podcast, PodcastCategory } from './podcast.entity';

@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  @MinLength(4)
  title: string;

  @Column({ type: 'enum', enum: PodcastCategory })
  @Field((type) => PodcastCategory)
  @IsEnum(PodcastCategory)
  category: PodcastCategory;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes)
  @Field((type) => Podcast)
  podcast: Podcast;
}
