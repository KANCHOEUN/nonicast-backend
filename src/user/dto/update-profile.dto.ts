import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entity/user.entity';

@InputType()
export class UpdateProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

@ObjectType()
export class UpdateProfileOutput extends CoreOutput {}
