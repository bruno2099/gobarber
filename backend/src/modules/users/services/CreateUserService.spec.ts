import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositpory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserservice = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUserservice.execute({
            name: 'John Doe',
            password: '12345',
            email: 'teste@teste.com',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with a exists email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserservice = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUserservice.execute({
            name: 'John Doe',
            password: '12345',
            email: 'teste@teste.com',
        });

        expect(
            createUserservice.execute({
                name: 'John Doe',
                password: '12345',
                email: 'teste@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
