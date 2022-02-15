import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Book } from './book.entity';
import { Tag } from './tag.entity';

@Entity({name: "book_tags"})
export class BookTag{

    @PrimaryGeneratedColumn() 
    id: number; 

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Book, book => book.bookTags)
    book: Book;
    
    @ManyToOne(() => Tag, tag => tag.bookTags)
    tag: Tag;
}