import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UserOutput } from './dto/user.dto';
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

  // @Query((returns) => Boolean)
  // me(): Promise<UserOutput> {
  //   return true;
  // }

  @Query((returns) => Boolean)
  getProfile(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  updateProfile(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  toggleSubscribe(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  getSubscriptions(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  markEpisodeAsPlayed(): boolean {
    return true;
  }
}
