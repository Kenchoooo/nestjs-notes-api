import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Importa esto
import { Note } from './entities/note.entity';   // <-- 2. Importa la entidad

@Module({
  // 3. Agrega la siguiente línea al array de 'imports'
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}