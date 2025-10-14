import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Esta clase es el molde para la tabla 'notes' en la base de datos.
@Entity({ name: 'notes' })
export class Note {
  // La columna principal (ID). Se genera sola con un código único (uuid).
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  // Por defecto, una nota nueva nunca está archivada.
  @Column({ default: false })
  is_archived: boolean;

  // TypeORM pone la fecha de creación automáticamente.
  @CreateDateColumn()
  created_at: Date;

  // TypeORM actualiza esta fecha cada vez que modifico la nota.
  @UpdateDateColumn()
  updated_at: Date;
}