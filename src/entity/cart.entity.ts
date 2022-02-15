import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity({name: "carts"})
export class Cart{

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column()
    quantity: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Book, book => book.carts)
    book: Book;
    
    @ManyToOne(() => User, user => user.carts)
    user: User;
}