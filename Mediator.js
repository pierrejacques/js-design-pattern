// 例如一个对战游戏，一方玩家全部死亡时，另一方获胜，需要通知另一方所有玩家，此时就需要中介者来管理所有玩家的状态
class Director {
    constructor() {
        this.players = {};
    }

    add(player) {
        if (!this.players[player.team]) {
            this.players[player.team] = new Set();
        }
        this.players[player.team].add(player);
        console.log(`Player ${player.name} added to Team ${player.team}`);
    }

    checkPlayers() { // 检查还剩下的队伍
        const remainedTeamKeys = Object.keys(this.players);
        if (remainedTeamKeys.length === 1) {
            remainedTeamKeys.forEach(key => {
                console.log(`Team ${key} won!`);
                this.players[key].forEach(player => {
                    player.win();
                });
            });
        }
    }

    checkTeam(team) { // 检查某队状态
        let hasLiving = false;
        const thisTeam = this.players[team];
        if (thisTeam.size === 0)
        thisTeam.forEach(player => {
            hasLiving = hasLiving || player.isAlive;
        });
        if (!hasLiving) {
            console.log(`Team ${team} lost!`);
            thisTeam.forEach(player => player.lose());
            this.removeTeam(team);
        }
    }

    changeTeam(player, toTeamName) { // 改换门庭
        const fromTeamName = player.team;
        const fromTeam = this.players[fromTeamName];
        fromTeam.delete(player);
        player.team = toTeamName;
        this.add(player);
        this.checkTeam(fromTeamName);
        if (fromTeam.size === 0) { delete this.players[fromTeamName]; }
        player.team = toTeam;
        this.add(player);
        checkPlayers();
    }

    removeTeam(teamName) { // 移除队伍
        delete this.players[teamName];
        this.checkPlayers();
    }

    removePlayer(player) {
        this.players[player.team].delete(player);
        console.log(`Player ${player.name} exited game !`);
        checkTeam(player.team);
    }
}

class Player {
    constructor(name, team, director) {
        this.name = name;
        this.team = team;
        this.director = director;
        this.isAlive = true;
        this.director.add(this);
    }

    remove() {
        this.director.removePlayer(this);
    }

    changeTeam(team) {
        if (this.team !== team) {
            this.director.changeTeam(this, team);
        }
    }

    win() {
        console.log(`${this.name} won`);
    }

    lose() {
        console.log(`${this.name} lost`);
    }

    die() {
        console.log(`${this.name} dead`);
        this.isAlive = false;
        this.director.checkTeam(this.team);
    }
}

const director = new Director();
const player1 = new Player('Johann', 'Germania', director);
const player2 = new Player('Schneider', 'Germania', director);
const player3 = new Player('Hans', 'Germania', director);
const player4 = new Player('Marcus', 'Roman', director);
const player5 = new Player('Julius', 'Roman', director);
const player6 = new Player('Caesar', 'Roman', director);
const player7 = new Player('Cao', 'China', director);
const player8 = new Player('Liu', 'China', director);
const player9 = new Player('Sun', 'China', director);

player1.die();
player4.die();
player7.die();
player2.die();
player5.die();
player3.die();
player6.die();
