import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity';
import { AssignTagsDto } from './dto/assign-tags.dto';

@Injectable()
export class NotesService {
  // Ahora inyecto los dos repositorios: el de notas y el de tags.
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(newNote);
  }

  findAll(): Promise<Note[]> {
    return this.noteRepository.findBy({ is_archived: false });
  }

  findAllArchived(): Promise<Note[]> {
    return this.noteRepository.findBy({ is_archived: true });
  }

  async findOne(id: string): Promise<Note> {
    // Para buscar la nota, le pido que también me traiga los tags relacionados.
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

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

  async remove(id: string): Promise<void> {
    const result = await this.noteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Nota con ID "${id}" no encontrada`);
    }
  }

  async archive(id: string): Promise<Note> {
    const note = await this.findOne(id);
    note.is_archived = true;
    return this.noteRepository.save(note);
  }

  async unarchive(id: string): Promise<Note> {
    const note = await this.findOne(id);
    note.is_archived = false;
    return this.noteRepository.save(note);
  }

  // Asigna una lista de etiquetas a una nota.
  async assignTags(id: string, assignTagsDto: AssignTagsDto): Promise<Note> {
    const note = await this.findOne(id); // Reúso esto para que me encuentre la nota
    const tags: Tag[] = [];

    // Por cada nombre de tag que me mandaron...
    for (const tagName of assignTagsDto.tags) {
      // Me fijo si ya existe un tag con ese nombre en la base de datos.
      let tag = await this.tagRepository.findOneBy({ name: tagName });

      // Si no existe, lo creo en memoria.
      if (!tag) {
        tag = this.tagRepository.create({ name: tagName });
      }
      tags.push(tag);
    }

    // Le reemplazo los tags viejos a la nota por los nuevos.
    note.tags = tags;
    // Guardo la nota. El 'cascade: true' se encarga de guardar los tags nuevos. ¡Magia!
    return this.noteRepository.save(note);
  }
}