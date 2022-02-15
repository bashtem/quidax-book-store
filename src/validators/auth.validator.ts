import { IsNotEmpty } from 'class-validator'

export class LoginValidator{
    @IsNotEmpty() username: string;
    @IsNotEmpty() password: string;
}