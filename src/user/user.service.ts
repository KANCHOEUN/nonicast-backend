import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { Podcast } from 'src/podcast/entity/podcast.entity';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { SubscribeInput, SubscribeOutput } from './dto/subscribe.dto';
import {
  UpdateProfileInput,
  UpdateProfileOutput,
} from './dto/update-profile.dto';
import { UserOutput } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const isExist = await this.userRepository.findOne({ email });
      if (isExist) {
        return { ok: false, error: `There is a user with ${email}` };
      }
      await this.userRepository.save(
        this.userRepository.create({ email, password, role }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.userRepository.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return { ok: false, error: 'User Not Found' };
      }
      const confirm = await user.checkPassword(password);
      if (!confirm) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number): Promise<UserOutput> {
    try {
      const user = await this.userRepository.findOne(id, {
        relations: ['reviews'],
      });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updateProfile(
    userId: number,
    { email, password }: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    try {
      const newUser = await this.userRepository.findOneOrFail(userId);
      if (email) newUser.email = email;
      if (password) newUser.password = password;
      await this.userRepository.save(newUser);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async toggleSubscribe(
    user: User,
    { id }: SubscribeInput,
  ): Promise<CoreOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(id);
      if (!podcast) {
        return { ok: false, error: `Podcast ${id} Not Found` };
      }
      if (user.subscriptions.some((sub) => sub.id === id)) {
        user.subscriptions = user.subscriptions.filter((sub) => sub.id !== id);
      } else {
        user.subscriptions = [...user.subscriptions, podcast];
      }
      await this.userRepository.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
