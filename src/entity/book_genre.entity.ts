import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Book } from './book.entity';
import { Genre } from './genre.entity';

@Entity({name: "book_genres"})
export class BookGenre{

    @PrimaryGeneratedColumn() 
    id: number; 

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Book, book => book.bookGenres)
    book: Book;
    
    @ManyToOne(() => Genre, genre => genre.bookGenre)
    genre: Genre;
}