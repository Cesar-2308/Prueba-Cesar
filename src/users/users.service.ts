import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import { EstadoUsuario } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor (@InjectRepository(User) private userRepository: Repository<User> ) {}

  async createUser(user: CreateUserDto) {
    
    const existe = await this.userRepository.findOne({
      where: {
        Correo: user.Correo
      }
    });

    if (existe) {
      return ("El correo ya existe")
    }

    const newUser = this.userRepository.create({
      Nombre: user.Nombre,
      Correo: user.Correo,
      Clave: user.Clave,
      Estado: EstadoUsuario.ACTIVO
    })
    return this.userRepository.save(newUser)  
  } 

  getUsers() {
    return this.userRepository.find({
      where: {
        Estado: EstadoUsuario.ACTIVO
      }
    })
  }
  getUser(Id: number) {
    return this.userRepository.findOne({
      where: {
        Id: Id,
        Estado: EstadoUsuario.ACTIVO
      }
    })
  }

  getInactivoUsers() {
    return this.userRepository.find({
      where: {
        Estado: EstadoUsuario.INACTIVO
      }
    })
  }

    getUserNombre(nombre: string) {
    return this.userRepository.findOne({
      where: {
        Nombre: nombre
      }
    })
  } 

  async deleteUser(Id: number) {
    await this.userRepository.update(Id,{
      Estado: EstadoUsuario.INACTIVO,
    });
    return ("Usuario eliminado")
  }

  async updateUser(Id:number, user: UpdateUserDto){
    let claveEncriptada = user.Clave;

    if (user.Clave) {
    claveEncriptada = await bcrypt.hash(user.Clave, 10);
  }
    await this.userRepository.update(Id,{
      Nombre: user.Nombre,
      Correo: user.Correo,
      Clave: claveEncriptada,
    });
    return ("Usuario Actualizado")
  }
}
