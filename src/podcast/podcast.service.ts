import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dto/create-podcast.dto';
import { PodcastOutput, PodcastsOutput } from './dto/podcast.dto';
import { Podcast } from './entity/podcast.entity';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
  ) {}

  async createPodcast(
    // TODO: get user to save owner property
    createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    try {
      const podcast = this.podcastRepository.create(createPodcastInput);
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
}
