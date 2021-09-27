import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dto/create-podcast.dto';
import { PodcastOutput, PodcastsOutput } from './dto/podcast.dto';
import { Episode } from './entity/episode.entity';
import { Podcast } from './entity/podcast.entity';
import { PodcastService } from './podcast.service';

@Resolver((of) => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Mutation((returns) => CreatePodcastOutput)
  async createPodcast(
    @Args('input') input: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastService.createPodcast(input);
  }

  @Query((returns) => PodcastsOutput)
  getPodcasts(): Promise<PodcastsOutput> {
    return this.podcastService.getPodcasts();
  }

  @Query((returns) => Boolean)
  getPodcast(@Args('id') id: number): Promise<PodcastOutput> {
    return this.podcastService.getPodcast(id);
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

@Resolver((of) => Episode)
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
