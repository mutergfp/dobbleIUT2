import * as props from './props';
import * as cardGenAPI from './cardGeneration';
import * as logsAPI from './logs';
import bcrypt from 'bcrypt';

function Match() {
    var id, players, middleCard, status, startTime, matchTime, endTime;

    function construct() {
        id = 0;
        players = [];
        middleCard = [];
        status = 0;
        endTime = 0;
        matchTime = 0;
        startTime = 0;
    }

    construct();

    function init(time = 60000, startDelay = 60000) {
        if (canInit()) {
            matchTime = time;
            startTime = Date.now() + startDelay;
            id = bcrypt.hashSync(Date.now().toString(), 10); 
            status++;
            events.emit('game/init', {
                name: 'game/init',
                data: {
                    startTime
                }
            });
            setTimeout(start, startDelay);
        }
    }

    function start() {  
        if (canStart()) {
            resetPlayerScores();
            giveCards()
                .then(data => {
                    status++;
                    endTime = Date.now() + matchTime;
                    main();                   
                })
                .catch(err => console.error(err));
        }
    }

    function main() {
        events.emit('game/start', {
            name: 'game/start',
            data: getMatchInfos()
        });
        console.log(getMatchInfos());
        setTimeout(finishMatch, matchTime);
    }
    
    function playerTurn({username}, symbol) {
        if (playerExist({username})) {
            let player = findPlayer({username});
            let isMatch = player.card.includes(symbol) && middleCard.includes(symbol);
            /* logClick(player, isMatch, symbol)
                .then(data => console.log(data))
                .catch(err => console.error(err.message)); */
            return isMatch;
        }
        return false;
    }
    
    function nextPick({username}) {
        var player = findPlayer({username});
        scoreUp(player);
        player.card = middleCard;
        return giveMiddleCard();
    }

    function giveCards() {
        return cardGenAPI.genStarterPack(players.length)
            .then(response => response.data)
            .then(data => {
                players = players.map((player, i) => {
                    player.card = data.playersCards[i]
                    return player;
                })

                middleCard = data.middleCard;
                return data;
            });
    }

    function giveMiddleCard() {
        return cardGenAPI.genMiddleCard(getAllPlayerCards())
            .then(response => response.data)
            .then(middleCardData => middleCard = middleCardData);
    }

    function logPlayerMatch() {
        var timestamp = Date.now();
        return Promise.all(players.map(player => logsAPI.logPlayerMatch({
            idPartie: id,
            idJoueur: player.username,
            scoreJoueur: player.score,
            estGagnant: player.rank === 1,
            timestamp
        })));
    }

    function logClick({ username }, isMatch, symbol) {
        return logsAPI.logClick({ 
            idPartie: id,
            idJoueur: player.username,
            estCorrect: isMatch,
            idImage: symbol,
            timestamp: Date.now()
        });
    }

    function resetPlayerScores() {
        players = players.map(player => {
            player.score = 0
            return player;
        });
    } 

    function canStart() {
        return players.length >= 2 && status === 1;
    }
    
    function canInit() {
        return players.length >= 2 && status === 0;
    }

    function playerExist({ username }) {
        return players.findIndex(p => p.username === username) !== -1;
    }

    function findPlayer({ username }) {
        return players.find(player => player.username === username);
    }

    function finishMatch() {
        status++;
        console.log(getMatchInfos());
        // emit event for sockets
        events.emit('game/finish', {
            name: 'game/finish',
            data: getMatchInfos()
        });

        /* logPlayerMatch()
            .then(dataArr => {
                console.log(dataArr);
                construct();
            })
            .catch(err => console.error(err.message)); */
        construct();
    }

    function isStarted() {
        return status === 2;
    }

    function isFinished() {
        return Date.now() >= endTime;
    }

    function getAllPlayerCards() {
        return players.map(player => player.card);
    }

    function addPlayer({ username }) {
        var player = {
            username,
            score: 0,
            card: []
        };
        if (players.length < 8 && !playerExist(player)) {
            players.push(player);
        }
        return playerExist(player);
    }

    function removePlayer(username) {
        players = players.filter(player => player.username !== username);
    }

    function getRanking() {
        return players
            .sort((pa, pb) => pb.score - pa.score)
            .map((player, i, self) => ({
                    username: player.username,
                    rank: self.findIndex(p => p.score === player.score) + 1
                })
            );
    }

    function getRank({ username }) {
        return (getRanking().find(r => r.username === username) || {}).rank;
    }

    function getStatus() {
        return status;
    }

    function getStatusMessage() {
        return props.status[status]
    }

    function getStartTime() {
        return startTime;
    }

    function getMatchInfos() {

        return {
            ranking: getRanking(),
            id,
            middleCard,
            players: players.map(getPlayerInfos),
            status,
            statusMessage: getStatusMessage(),
            endTime,
            startTime
        };
    }

    function getPlayerInfos({username}) {
        return Object.assign(
            findPlayer({username}),
            { rank: getRank({username}) }
        )
    }

    function scoreUp({username}) {
        var player = findPlayer({username});
        if (player) player.score += props.SCORE_UP;
    }

    function scoreDown({username}) {
        var player = findPlayer({username});
        if (player) {
            player.score -= props.SCORE_DOWN;
            if (player.score < 0) {
                player.score = 0;
            }
        }
    }

    return {
        getStatus, 
        init, 
        start,
        addPlayer,
        findPlayer,
        getStatusMessage,
        playerExist,
        getMatchInfos,
        playerTurn,
        nextPick,
        isStarted,
        getPlayerInfos,
        getStartTime,
        scoreDown
    };
}

module.exports = Match;