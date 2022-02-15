import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity({name: "ratings"})
export class Rating{

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column()
    rating: number;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Book, book => book.ratings)
    book: Book;
    
    @ManyToOne(() => User, user => user.ratings)
    user: User;
}