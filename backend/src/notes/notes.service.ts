import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(newNote);
  }

  // Busca y devuelve todas las notas NO ARCHIVADAS.
findAll(): Promise<Note[]> {
  return this.noteRepository.findBy({ is_archived: false });
}

// Busca y devuelve todas las notas ARCHIVADAS.
findAllArchived(): Promise<Note[]> {
  return this.noteRepository.findBy({ is_archived: true });
}

  // Busca una única nota por su ID.
  async findOne(id: string): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException(`Nota con ID "${id}" no encontrada`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.preload({
      id: id,
      ...updateNoteDto,
    });

    if (!note) {
      throw new NotFoundException(`Nota con ID "${id}" no encontrada`);
    }
    return this.noteRepository.save(note);
  }

  // Elimina una nota por su ID.
  async remove(id: string): Promise<void> {
    const result = await this.noteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Nota con ID "${id}" no encontrada`);
    }
  }

    // Archiva una nota (pone is_archived en true).
  async archive(id: string): Promise<Note> {
    const note = await this.findOne(id); // Reutilizamos findOne para buscar y manejar el error si no la encuentra.
    note.is_archived = true;
    return this.noteRepository.save(note);
  }

  // Desarchiva una nota (pone is_archived en false).
  async unarchive(id: string): Promise<Note> {
    const note = await this.findOne(id);
    note.is_archived = false;
    return this.noteRepository.save(note);
  }
}