import * as props from './props';
import * as cardGenAPI from './cardGeneration';
import bcrypt from 'bcrypt';

function Match() {
    var id = 0;
    var players = [];
    var middleCard = [];
    var status = 0;
    var endTime = 0;
    var matchTime = 0;

    function init(time = 60000, startDelay = 60000) {
        if (canInit()) {
            matchTime = time;
            id = bcrypt.hashSync(Date.now().toString(), 10); 
            status++;
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
        console.log(getMatchInfos());
        setTimeout(finishMatch, matchTime);
    }
    
    function playerTurn({username}, symbol) {
        if (playerExist({username})) {
            let player = findPlayer({username});
            return player.card.includes(symbol) && middleCard.includes(symbol); 
        }
        return false;
    }
    
    function nextPick({username}) {
        var player = findPlayer({username});
        player.score++;
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
        // emit event for socket
        resetMatch();
    }

    function resetMatch() {
        id = 0;
        players = [];
        middleCard = [];
        status = 0;
        endTime = 0;
        matchTime = 0;
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
            .map((player, i, self) => {
                return {
                    username: player.username,
                    rank: self.findIndex(p => p.score === player.score) + 1
                };
            });
    }

    function getStatus() {
        return status;
    }

    function getStatusMessage() {
        return props.status[status]
    }

    function getMatchInfos() {
        return {
            id,
            middleCard,
            players,
            status,
            statusMessage: getStatusMessage(),
            endTime,
            ranking: getRanking()
        };
    }

    function getPlayerInfos({username}) {
        return findPlayer({username});;
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
        getPlayerInfos
    };
}

module.exports = Match;