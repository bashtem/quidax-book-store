import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BookGenre } from './book_genre.entity';

@Entity({name: "genres"})
export class Genre{

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column()
    title: string;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => BookGenre, bookGenre => bookGenre.genre)
    bookGenre: BookGenre[];
}