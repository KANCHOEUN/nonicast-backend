import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entity/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'category',
  'coverImg',
  'description',
]) {}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  id?: number;
}
