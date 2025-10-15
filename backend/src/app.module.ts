import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user', // El mismo que pusimos en docker-compose.yml
      password: 'password', // La misma que pusimos en docker-compose.yml
      database: 'notesdb', // El mismo que pusimos en docker-compose.yml
      autoLoadEntities: true,
      synchronize: true, // ¡Muy importante! Crea las tablas automáticamente
    }),
    NotesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}