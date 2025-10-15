import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Tag } from '../tags/entities/tag.entity'; // Importo el Tag

@Module({
  // Agrego 'Tag' al array de forFeature para poder usarlo en el servicio de notas.
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}