import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
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

  @Query((returns) => Boolean)
  @Role(['Any'])
  me(@AuthUser() authUser: User): User {
    return authUser;
  }

  @Query((returns) => UserOutput)
  @Role(['Any'])
  getProfile(@Args('userId') userId: number): Promise<UserOutput> {
    return this.userService.findById(userId);
  }

  @Role(['Any'])
  @Mutation((returns) => Boolean)
  updateProfile(): boolean {
    return true;
  }

  @Role(['Listener'])
  @Mutation((returns) => Boolean)
  toggleSubscribe(): boolean {
    return true;
  }

  @Role(['Listener'])
  @Query((returns) => Boolean)
  getSubscriptions(): boolean {
    return true;
  }

  @Role(['Listener'])
  @Mutation((returns) => Boolean)
  markEpisodeAsPlayed(): boolean {
    return true;
  }
}
