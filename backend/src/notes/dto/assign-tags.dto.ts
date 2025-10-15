// DTO para recibir la lista de tags a asignar a una nota.
export class AssignTagsDto {
  // Espero un array con los nombres de los tags, ej: ["trabajo", "idea"]
  tags: string[];
}