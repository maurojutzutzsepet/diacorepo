import { genSalt, hash } from 'bcryptjs';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { User } from '../user/user.entity';
import { SignupDTO } from './dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDTO: SignupDTO) {
    const { cui, password, email } = signupDTO;
    const user = new User();
    user.cui = cui;
    user.email = email;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    const defaultRole: Role = await roleRepository.findOne({
      where: { nombre: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    const details = new UserDetails();

    user.details = details;

    const salt = await genSalt(10);

    user.password = await hash(password, salt);

    await user.save();
  }
}
