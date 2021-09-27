import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dto/create-podcast.dto';
import { PodcastService } from './podcast.service';

@Resolver()
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Mutation((returns) => Boolean)
  async createPodcast(
    @Args('input') input: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastService.createPodcast(input);
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
