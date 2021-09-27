import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Episode } from './episode.entity';

export enum PodcastCategory {
  Arts = 'Arts',
  Business = 'Business',
  Culture = 'Culture',
  Education = 'Education',
  Entertainment = 'Entertainment',
  Fiction = 'Fiction',
  History = 'History',
  Health = 'Health',
  Music = 'Music',
  Science = 'Science',
  Sports = 'Sports',
  Technology = 'Technology',
}

registerEnumType(PodcastCategory, { name: 'PodcastCategory' });

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  @MinLength(4)
  title: string;

  @Column()
  @Field((type) => String, { nullable: true })
  coverImg: string;

  @Column({ type: 'enum', enum: PodcastCategory })
  @Field((type) => PodcastCategory)
  @IsEnum(PodcastCategory)
  category: PodcastCategory;

  @Column()
  @Field((type) => String)
  @IsString()
  description: string;

  @Column()
  @Field((type) => Number, { nullable: true, defaultValue: 0 })
  @Min(0)
  @Max(5)
  @IsNumber()
  @IsOptional()
  rating: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.podcasts, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @Field((type) => [Episode])
  @OneToMany((type) => Episode, (episode) => episode.podcast, {
    onDelete: 'SET NULL',
    eager: true,
  })
  episodes: Episode[];
}
