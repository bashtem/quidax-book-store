import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entity/user.entity'
import * as bcrypt from 'bcrypt';
 
export default class CreateBooks implements Seeder {

  public async run(factory: Factory, connection: Connection): Promise<any> {

    const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'firstusername',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'secondusername',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'thirdusername',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ])
      .execute()
  }
}