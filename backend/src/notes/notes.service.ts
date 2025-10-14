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

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
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
}