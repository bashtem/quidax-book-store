import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BookTag } from './book_tag.entity';

@Entity({name: "tags"})
export class Tag{

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column()
    title: string;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => BookTag, bookTag => bookTag.tag)
    bookTags: BookTag[];
}