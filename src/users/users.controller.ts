import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ description: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    getUsers(): Promise<User[]> {
      return this.usersService.getUsers();
}

  @Get(':nombre')
  @ApiOperation({ description: 'Obtener un usuario por Nombre' })
  @ApiParam({ name: 'nombre', type: 'string', description: 'Nombre del usuario a obtener' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    getUser(@Param('nombre') Nombre: string ) { 
      return this.usersService.getUser(Nombre);
}

  @Get('estado/inactivo')
  getInactivoUsers(): Promise<User[]> {
    return this.usersService.getInactivoUsers();
}

  @Post()
  @ApiOperation({ description: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto, description: 'Datos del nuevo usuario',
    examples: {
      example1: {
        value: {
          name: "Carlos Gonzales",
          email: "carlos94@gmail.com",
          password: "Carlos1234"
        }
      } 
    }
  })
  @ApiResponse({ status: 201, description: 'Creado correctamente' })
  @ApiResponse({ status: 409, description: 'El correo ya existe' })
    
  

    createUser(@Body () newUser: CreateUserDto): Promise<"El correo ya existe" | User> { 
      return this.usersService.createUser(newUser); 
}
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) Id: number,@Body() user: UpdateUserDto) {
    return this.usersService.updateUser(Id, user);
}

  @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) Id: number) {
      return this.usersService.deleteUser(Id);

}
  
}