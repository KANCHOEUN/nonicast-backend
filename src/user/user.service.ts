import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
}
