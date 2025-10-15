import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AssignTagsDto } from './dto/assign-tags.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  // Ahora esta función puede recibir un filtro por tag.
  @Get()
  findAll(@Query('tag') tagName?: string) {
    if (tagName) {
      // Si me pasan un tag, llamo a la nueva función para filtrar.
      return this.notesService.findAllByTag(tagName);
    }
    // Si no me pasan ningún tag, funciona como antes.
    return this.notesService.findAll();
  }

  @Get('archived/all')
  findAllArchived() {
    return this.notesService.findAllArchived();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.notesService.archive(id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.notesService.unarchive(id);
  }

  @Patch(':id/tags')
  assignTags(@Param('id') id: string, @Body() assignTagsDto: AssignTagsDto) {
    return this.notesService.assignTags(id, assignTagsDto);
  }
}