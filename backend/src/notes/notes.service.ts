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

  async assignTags(id: string, assignTagsDto: AssignTagsDto): Promise<Note> {
    const note = await this.findOne(id);
    const tags: Tag[] = [];

    for (const tagName of assignTagsDto.tags) {
      let tag = await this.tagRepository.findOneBy({ name: tagName });
      if (!tag) {
        tag = this.tagRepository.create({ name: tagName });
      }
      tags.push(tag);
    }

    note.tags = tags;
    return this.noteRepository.save(note);
  }

  findAllByTag(tagName: string): Promise<Note[]> {
    return this.noteRepository
      .createQueryBuilder('note') // Empiezo a construir una consulta sobre la tabla 'note'.
      .innerJoinAndSelect('note.tags', 'tag') // Hago un 'join' con la tabla de tags y pido que me los traiga.
      .where('tag.name = :tagName', { tagName }) // Busco donde el nombre del tag sea el que me pasaron.
      .getMany(); // Devuelvo todas las notas que coincidan.
  }
}