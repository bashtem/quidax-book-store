import { Column, CreateDateColumn, Entity, Generated, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BookGenre } from './book_genre.entity';
import { BookReaction } from './book_reaction.entity';
import { BookTag } from './book_tag.entity';
import { Cart } from './cart.entity';
import { Rating } from './rating.entity';

@Entity({name: "books"})
export class Book{

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column()
    @Index()
    @Generated('uuid')
    slug: string;

    @Column()
    title: string;
    
    @Column()
    author: string;
    
    @Column()
    description: string;
    
    @Column()
    body: string;
    
    @Column({default: false})
    featured: boolean;
    
    @Column({name: 'img_url'})
    imgUrl: string;
    
    @Column({name: 'authored_year'})
    authoredYear: Date;

    @Column()
    publisher: string;

    @Column({name: 'release_date'})
    releaseDate: Date;

    @Column()
    quantity: number;

    @Column({type: 'double'})
    price: number;
   
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => BookGenre, bookGenre => bookGenre.book)
    bookGenres: BookGenre[];
    
    @OneToMany(() => BookReaction, bookReaction => bookReaction.book)
    bookReactions: BookReaction[];
   
    @OneToMany(() => Rating, rating => rating.book)
    ratings: Rating[];
    
    @OneToMany(() => BookTag, bookTag => bookTag.book)
    bookTags: BookTag[];
    
    @OneToMany(() => Cart, cart => cart.book)
    carts: Cart[];
}