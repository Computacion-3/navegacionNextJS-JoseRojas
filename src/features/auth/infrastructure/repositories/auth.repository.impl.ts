import { User } from '../../domain/entities/user';
import { AuthRepository, LoginParams, RegisterParams } from '../../domain/repositories/auth.repository';
import { AuthDatasource } from '../datasources/auth-datasource.interface';
import { UserMapper } from '../mappers/user.mapper';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly datasource: AuthDatasource) { }

    async login(params: LoginParams): Promise<User> {
        const dtoToSend = UserMapper.toLoginDto(params);
        const userDto = await this.datasource.login(dtoToSend);
        return UserMapper.toDomain(userDto);
    }

    async register(params: RegisterParams): Promise<User> {
        const dtoToSend = UserMapper.toRegisterDto(params);
        const createdDto = await this.datasource.register(dtoToSend);
        return UserMapper.toDomain(createdDto);
    }
}