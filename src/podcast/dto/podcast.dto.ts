import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entity/podcast.entity';

@ObjectType()
export class PodcastsOutput extends CoreOutput {
  @Field((type) => [Podcast])
  podcasts?: Podcast[];
}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field((type) => Podcast)
  podcast?: Podcast;
}
