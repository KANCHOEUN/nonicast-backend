import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
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
import { PodcastOutput, PodcastsOutput } from './dto/podcast.dto';
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

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createPodcast(
    creator: User,
    createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    try {
      const podcast = this.podcastRepository.create(createPodcastInput);
      podcast.owner = creator;
      podcast.episodes = [];
      const { id } = await this.podcastRepository.save(podcast);
      return { ok: true, id };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcasts(): Promise<PodcastsOutput> {
    try {
      const podcasts = await this.podcastRepository.find({
        relations: ['owner'],
      });
      return { ok: true, podcasts };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(id, {
        relations: ['owner', 'subscribers', 'reviews'],
      });
      if (!podcast) {
        return { ok: false, error: `Podcast ${id} Not Found` };
      }
      return { ok: true, podcast };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async isValidAccess(user: User, id: number): Promise<PodcastOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };
      if (user.id !== podcast.owner.id) {
        return { ok: false, error: 'Not Authorized' };
      }
      return { ok, podcast };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updatePodcast(
    user: User,
    { id, payload }: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    try {
      const { ok, error, podcast } = await this.isValidAccess(user, id);
      if (!ok) return { ok, error };
      if (payload.rating && (payload.rating < 0 || payload.rating > 5)) {
        return { ok: false, error: 'Rating must be between 0 and 5' };
      }
      const newPodcast: Podcast = { ...podcast, ...payload };
      await this.podcastRepository.save(newPodcast);
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deletePodcast(user: User, id: number): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.isValidAccess(user, id);
      if (!ok) {
        return { ok, error };
      }
      await this.podcastRepository.delete({ id });
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createEpisode(
    creator: User,
    { podcastId, title, fileUrl }: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    try {
      const { ok, error, podcast } = await this.isValidAccess(
        creator,
        podcastId,
      );
      if (!ok) return { ok, error };

      const newEpisode = this.episodeRepository.create({ title, fileUrl });
      newEpisode.podcast = podcast;
      const { id } = await this.episodeRepository.save(newEpisode);
      return { ok, id };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    const { ok, error, podcast } = await this.getPodcast(podcastId);
    return ok ? { ok, episodes: podcast.episodes } : { ok, error };
  }

  async getEpisode(id: number): Promise<EpisodeOutput> {
    try {
      const episode = await this.episodeRepository.findOne(id);
      if (!episode) {
        return { ok: false, error: `Episode ${id} Not Found` };
      }
      return { ok: true, episode };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updateEpisode(
    user: User,
    { podcastId, episodeId, payload }: UpdateEpisodeInput,
  ): Promise<UpdateEpisodeOutput> {
    try {
      const { ok, error } = await this.isValidAccess(user, podcastId);
      if (!ok) return { ok, error };

      const episode = await this.episodeRepository.findOne(episodeId);
      const newEpisode: Episode = { ...episode, ...payload };
      await this.episodeRepository.save(newEpisode);
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteEpisode(
    user: User,
    { podcastId, episodeId }: EpisodeInput,
  ): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.isValidAccess(user, podcastId);
      if (!ok) {
        return { ok, error };
      }
      await this.episodeRepository.delete({ id: episodeId });
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createReview(
    creator: User,
    { podcastId, content }: CreateReviewInput,
  ): Promise<CreateReviewOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(podcastId);
      if (!ok) return { ok: false, error };
      const review = this.reviewRepository.create({ content });
      review.podcast = podcast;
      review.creator = creator;
      await this.reviewRepository.save(review);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
