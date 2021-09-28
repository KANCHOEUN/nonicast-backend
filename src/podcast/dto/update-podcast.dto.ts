import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entity/podcast.entity';

@InputType()
export class UpdatePodcastPayload extends PartialType(
  PickType(Podcast, ['title', 'category', 'coverImg', 'description', 'rating']),
) {}

@InputType()
export class UpdatePodcastInput extends PickType(Podcast, ['id']) {
  @Field((type) => UpdatePodcastPayload)
  payload: UpdatePodcastPayload;
}

@ObjectType()
export class UpdatePodcastOutput extends CoreOutput {}
