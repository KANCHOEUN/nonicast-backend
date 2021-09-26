import { Module } from '@nestjs/common';
import { PodcastResolver } from './podcast.resolver';
import { PodcastService } from './podcast.service';

@Module({
  providers: [PodcastResolver, PodcastService],
})
export class PodcastModule {}
