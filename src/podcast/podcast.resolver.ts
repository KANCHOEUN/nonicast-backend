import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dto/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dto/create-podcast.dto';
import { CreateReviewInput, CreateReviewOutput } from './dto/create-review.dto';
import { EpisodeOutput, EpisodesOutput } from './dto/episode.dto';
import {
  PodcastOutput,
  PodcastsOutput,
  SearchPodcastInput,
  SearchPodcastOutput,
} from './dto/podcast.dto';
import {
  EpisodeInput,
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dto/update-episode.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dto/update-podcast.dto';
import { Episode } from './entity/episode.entity';
import { Podcast } from './entity/podcast.entity';
import { Review } from './entity/review.entity';
import { PodcastService } from './podcast.service';

@Resolver((of) => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Role(['Host'])
  @Mutation((returns) => CreatePodcastOutput)
  createPodcast(
    @AuthUser() user: User,
    @Args('input') input: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastService.createPodcast(user, input);
  }

  @Query((returns) => PodcastsOutput)
  getPodcasts(): Promise<PodcastsOutput> {
    return this.podcastService.getPodcasts();
  }

  @Query((returns) => PodcastOutput)
  getPodcast(@Args('id') id: number): Promise<PodcastOutput> {
    return this.podcastService.getPodcast(id);
  }

  @Role(['Host'])
  @Mutation((returns) => UpdatePodcastOutput)
  updatePodcast(
    @AuthUser() authUser: User,
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    return this.podcastService.updatePodcast(authUser, updatePodcastInput);
  }

  @Role(['Host'])
  @Mutation((returns) => CoreOutput)
  deletePodcast(
    @AuthUser() authUser: User,
    @Args('id') id: number,
  ): Promise<CoreOutput> {
    return this.podcastService.deletePodcast(authUser, id);
  }

  @Query((returns) => SearchPodcastOutput)
  searchPodcastByTitle(
    @Args('input') searchPodcastInput: SearchPodcastInput,
  ): Promise<SearchPodcastOutput> {
    return this.podcastService.searchPodcastByTitle(searchPodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Role(['Host'])
  @Mutation((returns) => CreateEpisodeOutput)
  createEpisode(
    @AuthUser() authUser: User,
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(authUser, createEpisodeInput);
  }

  @Query((returns) => EpisodesOutput)
  getEpisodes(@Args('id') podcastId: number): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastId);
  }

  @Query((returns) => EpisodeOutput)
  getEpisode(@Args('id') episodeId: number): Promise<EpisodeOutput> {
    return this.podcastService.getEpisode(episodeId);
  }

  @Role(['Host'])
  @Mutation((returns) => UpdateEpisodeOutput)
  updateEpisode(
    @AuthUser() authUser: User,
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<UpdateEpisodeOutput> {
    return this.podcastService.updateEpisode(authUser, updateEpisodeInput);
  }

  @Role(['Host'])
  @Mutation((returns) => CoreOutput)
  deleteEpisode(
    @AuthUser() authUser: User,
    @Args('input') episodeInput: EpisodeInput,
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(authUser, episodeInput);
  }
}

@Resolver((of) => Review)
export class ReviewResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Mutation(() => CreateReviewOutput)
  @Role(['Listener'])
  createReview(
    @AuthUser() authUser: User,
    @Args('input') createReviewInput: CreateReviewInput,
  ): Promise<CreateReviewOutput> {
    return this.podcastService.createReview(authUser, createReviewInput);
  }

  // TODO: Delete Review
}
