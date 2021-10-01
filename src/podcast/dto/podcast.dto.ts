import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entity/podcast.entity';

@ObjectType()
export class PodcastsOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}

@InputType()
export class SearchPodcastInput {
  @Field((type) => String)
  query: string;
}

@ObjectType()
export class SearchPodcastOutput extends PodcastsOutput {
  @Field((type) => Number)
  resultsCount?: number;
}
