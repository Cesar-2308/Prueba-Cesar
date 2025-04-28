import { EstadoUsuario } from '../user.entity';
import { IsEmail, IsString, MinLength, IsNotEmpty, Matches} from 'class-validator';

export class CreateUserDto{

  Id: number;

  @IsString()
  @IsNotEmpty({message: 'El nombre no puede estar vacío'})
  @Matches(/\S/, { message: 'El nombre no puede contener solo espacios' })
  Nombre: string;

  @IsNotEmpty({message: 'El correo no puede estar vacío'})
  @IsEmail({}, { message: 'El correo debe ser una dirección válida' })
  Correo: string;

  @IsNotEmpty({message: 'La clave no puede estar vacía'})
  @IsString()
  @MinLength(8, { message: 'La clave debe tener al menos 8 caracteres' })
  Clave: string;

  Estado: EstadoUsuario;
}