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

  findOne(id: string) {
    return `This action returns a #${id} note`;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    // Carga la nota existente y le aplica los nuevos cambios.
    const note = await this.noteRepository.preload({
      id: id,
      ...updateNoteDto,
    });

    if (!note) {
      throw new NotFoundException(`Nota con ID "${id}" no encontrada`);
    }

    return this.noteRepository.save(note);
  }

  remove(id: string) {
    return `This action removes a #${id} note`;
  }
}