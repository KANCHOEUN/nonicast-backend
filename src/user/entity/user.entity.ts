import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Podcast } from 'src/podcast/entity/podcast.entity';
import { Column, Entity, OneToMany } from 'typeorm';

export enum UserRole {
  Listener = 'Listener',
  Owner = 'Owner',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field((type) => [Podcast])
  @OneToMany((type) => Podcast, (podcast) => podcast.owner)
  podcasts: Podcast[];
}
