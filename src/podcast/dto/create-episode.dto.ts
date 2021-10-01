import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Episode } from '../entity/episode.entity';

@InputType()
export class CreateEpisodeInput extends PickType(Episode, [
  'title',
  'fileUrl',
]) {
  @Field((type) => Number)
  podcastId: number;
}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  id?: number;
}
