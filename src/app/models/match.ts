import { User } from './user';
import { Player } from './player';
import { MatchResults } from './matchResults';

export class Match {

    constructor(
        public id: number,
        public user1: User,
        public user2: User,
        public player1: any[],
        public player2: any[],
        public bet1: number,
        public bet2: number,
        public state1: 'Challenged' | 'Proposed' | 'Accepted' | 'Denied',
        public state2: 'Challenged' | 'Proposed' | 'Accepted' | 'Denied',
        public results: MatchResults
    ) {}
}
