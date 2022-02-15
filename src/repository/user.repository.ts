import { User } from "../entity/user.entity"
import { getRepository } from "typeorm"


export const getUserRepo = async (username: string): Promise<User> => {

    const user = await getRepository(User).findOne({where: {username}});

    return user;
}