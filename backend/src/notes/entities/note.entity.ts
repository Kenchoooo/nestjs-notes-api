// 1. Añado ManyToMany y JoinTable a los imports de typeorm.
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
// 2. Importo la entidad Tag para que Note sepa que existe.
import { Tag } from '../../tags/entities/tag.entity';

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

  // --- NUEVA SECCIÓN ---
  // Aca defino la relación "Muchos a Muchos" con la entidad Tag.
  // cascade: true es para que guarde los tags nuevos automáticamente al guardar la nota.
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'notes_tags', // El nombre de la tabla "puente" que se creará.
    joinColumn: { name: 'note_id' }, // Columna para el ID de esta entidad (Note).
    inverseJoinColumn: { name: 'tag_id' }, // Columna para el ID de la otra entidad (Tag).
  })
  tags: Tag[];
}