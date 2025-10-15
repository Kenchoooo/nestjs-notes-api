// 1. Agrego ManyToMany al import de typeorm.
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
// 2. Importo la entidad Note para que Tag sepa que existe.
import { Note } from '../../notes/entities/note.entity';

// Molde para la tabla 'tags'
@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // El nombre de la etiqueta no se puede repetir.
  @Column({ unique: true })
  name: string;

  // --- NUEVA SECCIÓN ---
  // Defino el otro lado de la relación "Muchos a Muchos".
  // Acá le digo que se conecta con la propiedad 'tags' que cree en la entidad Note.
  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}