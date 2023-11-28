import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryEntity } from "src/category/entity/category.entity";
import { ScheduleMetadataEntity } from "src/schedule/entity/schedule-metadata.entity";
import { FriendEntity } from "src/friend/entity/friend.entity";
import { ParticipantEntity } from "src/schedule/entity/participant.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId: number;

  @Column({ length: 26, name: "user_uuid" })
  userUuid: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ length: 12 })
  nickname: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ default: null, name: "deleted_at" })
  deletedAt: Date | null;

  @Column({ default: 0 })
  point: number;

  @Column({ nullable: true, name: "accept_notification" })
  acceptNotification: boolean;

  /*
   * relation
   * */
  @OneToMany(() => CategoryEntity, (category) => category.user, {
    cascade: true,
  })
  category: CategoryEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.from, {
    cascade: true,
  })
  friend: FriendEntity[];

  @OneToMany(() => ParticipantEntity, (participant) => participant.user, {
    cascade: true,
  })
  participant: ParticipantEntity[];
}
