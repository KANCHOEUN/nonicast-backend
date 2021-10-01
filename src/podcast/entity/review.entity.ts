import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('ReviewInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Review extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  content: string;

  @Field((type) => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.reviews, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;

  @RelationId((review: Review) => review.podcast)
  podcastId: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  creator: User;
}
