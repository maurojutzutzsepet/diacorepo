import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { UserDetails } from './user.details.entity';
@Entity('users')
export class User extends BaseEntity {
  //@ObjectIdColumn()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 13, nullable: false })
  cui: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne((type) => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @ManyToMany((type) => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}

// @Column({ type: 'varchar', length: 40 })
//   primer_nombre: string;

//   @Column({ type: 'varchar', length: 40 })
//   segundo_nombre: string;

//   @Column({ type: 'varchar', length: 40 })
//   primer_apellido: string;

//   @Column({ type: 'varchar', length: 40 })
//   segundo_apellido: string;

// @Column({ type: 'bit', default: 0 })
// flag_visible: boolean;

// @Column({ type: 'varchar', length: 20 })
// telefono: string;
