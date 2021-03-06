import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entity/episode.entity';
import { Podcast } from './entity/podcast.entity';
import { Review } from './entity/review.entity';
import {
  EpisodeResolver,
  PodcastResolver,
  ReviewResolver,
} from './podcast.resolver';
import { PodcastService } from './podcast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Podcast, Review])],
  providers: [EpisodeResolver, PodcastResolver, ReviewResolver, PodcastService],
})
export class PodcastModule {}
