import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUrl, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
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

  @Column()
  @Field((type) => String)
  @IsUrl()
  fileUrl: string;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Podcast)
  podcast: Podcast;
}
