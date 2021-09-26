import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PodcastResolver {
  @Mutation((returns) => Boolean)
  createPodcast(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  getPodcasts(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  getPodcast(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  updatePodcast(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  deletePodcast(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  searchPodcasts(): boolean {
    return true;
  }
}

@Resolver()
export class EpisodeResolver {
  @Mutation((returns) => Boolean)
  createEpisode(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  getEpisodes(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  updateEpisode(): boolean {
    return true;
  }

  @Mutation((returns) => Boolean)
  deleteEpisode(): boolean {
    return true;
  }
}
