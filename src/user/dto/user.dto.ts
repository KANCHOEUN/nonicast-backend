import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entity/user.entity';

@ObjectType()
export class UserOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
