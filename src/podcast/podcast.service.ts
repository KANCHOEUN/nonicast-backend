import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dto/create-podcast.dto';
import { PodcastOutput, PodcastsOutput } from './dto/podcast.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dto/update-podcast.dto';
import { Podcast } from './entity/podcast.entity';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
  ) {}

  async createPodcast(
    host: User,
    createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    try {
      const podcast = this.podcastRepository.create(createPodcastInput);
      podcast.owner = host;
      podcast.episodes = [];
      const { id } = await this.podcastRepository.save(podcast);
      return { ok: true, id };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcasts(): Promise<PodcastsOutput> {
    try {
      const podcasts = await this.podcastRepository.find();
      return { ok: true, podcasts };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(id);
      if (!podcast) {
        return { ok: false, error: `Podcast ${id} Not Found` };
      }
      return { ok: true, podcast };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updatePodcast(
    user: User,
    { id, payload }: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      if (user.id !== podcast.owner.id) {
        return { ok: false, error: 'Not Authorized' };
      }
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
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      if (user.id !== podcast.owner.id) {
        return { ok: false, error: 'Not Authorized' };
      }
      await this.podcastRepository.delete({ id });
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
