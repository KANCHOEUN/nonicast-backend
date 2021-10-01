import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from 'src/podcast/entity/podcast.entity';

@InputType()
export class SubscribeInput extends PickType(Podcast, ['id']) {}

@ObjectType()
export class SubscribeOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  subscriptions?: Podcast[];
}
