import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm'
import * as bcrypt from 'bcrypt';

export enum EstadoUsuario {
    ACTIVO = 'Activo',
    INACTIVO = 'Inactivo',
}

@Entity({name: 'Usuarios'})
export class User {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nombre: string;
    @Column({unique: true})
    Correo: string;
    @Column()
    Clave: string;
    @Column({ type: 'enum', enum: EstadoUsuario, default: EstadoUsuario.ACTIVO })
    Estado: EstadoUsuario;
    @BeforeInsert()
    async hashPassword() {
    this.Clave = await bcrypt.hash(this.Clave, 10);
}
}
