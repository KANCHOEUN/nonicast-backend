import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Mutation((returns) => Boolean)
  createAccount(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  login(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  me(): boolean {
    return true;
  }

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
