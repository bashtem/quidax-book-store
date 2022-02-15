import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity({name: "book_reactions"})
export class BookReaction{

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column({name: 'is_liked'})
    isLiked: boolean;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Book, book => book.bookReactions)
    book: Book;
    
    @ManyToOne(() => User, user => user.bookReactions)
    user: User;
}