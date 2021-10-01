import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Review } from '../entity/review.entity';

@InputType()
export class CreateReviewInput extends PickType(Review, [
  'podcastId',
  'content',
]) {}

@ObjectType()
export class CreateReviewOutput extends CoreOutput {}
