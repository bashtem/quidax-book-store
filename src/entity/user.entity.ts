import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BookReaction } from './book_reaction.entity';
import { Cart } from './cart.entity';
import { Rating } from './rating.entity';

@Entity({name: "users"})
export class User{

    @PrimaryGeneratedColumn() 
    id: number; 
   
    @Column({unique: true}) 
    username: string; 
    
    @Column() 
    password: string; 

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => BookReaction, bookReaction => bookReaction.user)
    bookReactions: BookReaction[];
    
    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];
    
    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];
}