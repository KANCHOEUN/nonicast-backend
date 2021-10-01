import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { CoreOutput } from 'src/common/dto/output.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { SubscribeInput } from './dto/subscribe.dto';
import {
  UpdateProfileInput,
  UpdateProfileOutput,
} from './dto/update-profile.dto';
import { UserOutput } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation((returns) => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Role(['Any'])
  @Query((returns) => User)
  me(@AuthUser() authUser: User): User {
    return authUser;
  }

  @Role(['Any'])
  @Query((returns) => UserOutput)
  getProfile(@Args('userId') userId: number): Promise<UserOutput> {
    return this.userService.findById(userId);
  }

  @Role(['Any'])
  @Mutation((returns) => UpdateProfileOutput)
  updateProfile(
    @AuthUser() authUser: User,
    @Args('input') updateProfileInput: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    return this.userService.updateProfile(authUser.id, updateProfileInput);
  }

  @Role(['Listener'])
  @Mutation((returns) => CoreOutput)
  toggleSubscribe(
    @AuthUser() authUser: User,
    @Args('input') toggleSubscribeInput: SubscribeInput,
  ): Promise<CoreOutput> {
    return this.userService.toggleSubscribe(authUser, toggleSubscribeInput);
  }
}
