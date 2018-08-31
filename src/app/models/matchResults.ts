export class MatchResults {

    constructor(
        public id: number,
        public matchId: number,
        public player1: any[],
        public player2: any[],
        public game1: any[],
        public game2: any[],
        public state: 'P1Win' | 'P2Win' | 'Draw',
        public viewed: boolean
    ) {}
}
