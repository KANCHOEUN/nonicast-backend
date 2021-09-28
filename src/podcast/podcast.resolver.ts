import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dto/create-podcast.dto';
import { PodcastOutput, PodcastsOutput } from './dto/podcast.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dto/update-podcast.dto';
import { Episode } from './entity/episode.entity';
import { Podcast } from './entity/podcast.entity';
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

  @Query((returns) => Boolean)
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

  @Query((returns) => Boolean)
  searchPodcasts(): boolean {
    return true;
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  @Role(['Host'])
  @Mutation((returns) => Boolean)
  createEpisode(): boolean {
    return true;
  }

  @Query((returns) => Boolean)
  getEpisodes(): boolean {
    return true;
  }

  @Role(['Host'])
  @Mutation((returns) => Boolean)
  updateEpisode(): boolean {
    return true;
  }

  @Role(['Host'])
  @Mutation((returns) => Boolean)
  deleteEpisode(): boolean {
    return true;
  }
}
