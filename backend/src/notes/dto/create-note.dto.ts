// DTO (Objeto de Transferencia de Datos).
// Sirve para validar los datos que me llegan cuando piden crear una nota.
export class CreateNoteDto {
  title: string;
  content: string;
}