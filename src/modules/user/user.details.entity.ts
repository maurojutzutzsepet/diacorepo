import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_details')
export class UserDetails extends BaseEntity {
  //@ObjectIdColumn()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 40, nullable: true })
  primer_nombre: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  segundo_nombre: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  primer_apellido: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  segundo_apellido: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

// @Column({ type: 'bit', default: 0 })
// flag_visible: boolean;

// @Column({ type: 'varchar', length: 20 })
// telefono: string;
