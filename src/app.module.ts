import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PodcastModule } from './podcast/podcast.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    PodcastModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
