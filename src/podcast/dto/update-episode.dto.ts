import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Episode } from '../entity/episode.entity';

@InputType()
export class EpisodeInput {
  @Field((type) => Number)
  podcastId: number;

  @Field((type) => Number)
  episodeId: number;
}

@InputType()
export class UpdateEpisodePayload extends PartialType(
  PickType(Episode, ['title', 'category']),
) {}

@InputType()
export class UpdateEpisodeInput extends EpisodeInput {
  @Field((type) => UpdateEpisodePayload)
  payload: UpdateEpisodePayload;
}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}
