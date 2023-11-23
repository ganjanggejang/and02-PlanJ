import { ScheduleMetadataEntity } from "src/schedule/entity/schedule-metadata.entity";
import { UserEntity } from "src/user/entity/user.entity";
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("category")
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "category_id" })
  categoryId: string;

  @Column({ length: 26, name: "category_uuid" })
  categoryUuid: string;

  @Column({ length: 128, name: "category_name" })
  categoryName: string;

  @Column({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ default: null, name: "deleted_at" })
  deletedAt: Date | null;

  /*
   * relation
   * */
  @ManyToOne(() => UserEntity, (user) => user.category, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => ScheduleMetadataEntity, (metadata) => metadata.category, {
    cascade: true,
  })
  scheduleMeta: ScheduleMetadataEntity[];
}
