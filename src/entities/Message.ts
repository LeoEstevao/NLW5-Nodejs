import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { v4 as uuid } from 'uuid';

import { User } from "./User";


@Entity('messages')
class Message {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    // LOCAL Column that will join the pk of REFERENCED Table
    @JoinColumn({ name: 'user_id' })
    // MANY Messages to ONE User
    @ManyToOne( () => User)
    // User entity imported
    user: User;

    @Column()
    user_id: string;
    
    @Column()
    text: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Message };