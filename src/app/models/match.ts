import { User } from './user';
import { Player } from './player';

export class Match {

    constructor(
        public id: number,
        public user1: User,
        public user2: User,
        public player1: any[],
        public player2: any[],
        public bet1: number,
        public bet2: number,
        public state1: string,
        public state2: string
    ) {}
}
