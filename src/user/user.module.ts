import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from 'src/podcast/entity/podcast.entity';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Podcast])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
