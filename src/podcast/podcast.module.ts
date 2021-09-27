import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './entity/podcast.entity';
import { PodcastResolver } from './podcast.resolver';
import { PodcastService } from './podcast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastResolver, PodcastService],
})
export class PodcastModule {}
