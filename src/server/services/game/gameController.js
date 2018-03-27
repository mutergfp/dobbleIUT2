import { genMiddleCard, genStarterPack } from './cardGeneration';

export const testGenMiddleCard = (req ,res) => {
    genMiddleCard([[1,2,3,4,5,6,7,8], [1,2,3,4,5,6,7,9]])
        .then(response => response.data)
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            message: err.message
        }));
}

export const testGenStarterPack = (req ,res) => {
    genStarterPack(2)
        .then(response => response.data)
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            message: err.message
        }));
}

export const testRoute = (req, res) => {
    res.send('it works');
}

export const join = (req, res) => {
    var player = req.user;
    if (match.isStarted())
        return res.status(410).json({
            message: 'La partie à déjà commencée',
            hasJoined: false
        });
    if (match.playerExist(player))
        return res.status(400).json({
            message: 'Vous avez déjà rejoint la partie',
            hasJoined: true,
            player: match.getPlayerInfos(player),
            status: match.getStatus(),
            statusMessage: match.getStatusMessage()
        });
    if (!match.addPlayer(player)) {
        return res.status(410).json({
            message: 'Vous ne pouvez pas rejoindre la partie, la partie est pleine',
            hasJoined: false
        });
    }
    match.init(120000, 10000);
    res.json({  
        message: 'Vous avez rejoint la partie',
        hasJoined: true,
        player: match.getPlayerInfos(player),
        status: match.getStatus(),
        statusMessage: match.getStatusMessage(),
        startTime: match.getStartTime()
    });
    
}

export const jouer = (req, res) => {
    var player = req.user
    if (!match.isStarted()) 
        return res.status(410).json({
            message: "La partie n'a pas commencée",
            status: match.getStatus(),
            statusMessage: match.getStatusMessage()
        });
    if (!req.body.symbol)
        return res.status(400).json({
            message: 'Vous devez fournir un symbole pour jouer'
        });
    if (!match.playerTurn(player, req.body.symbol)) {
        match.scoreDown(player);
        events.emit('game/updateScore', {
            name: 'game/updateScore',
            data: match.getPlayerInfos(player)
        });
        return res.status(404).json({
            message: 'Joueur non trouvé ou mauvais symbole'
        });
    }
    match.nextPick(player)
        .then(middleCard => {
            res.json({
                middleCard
            });
            // broadcast event to sockets
            events.emit('game/updateBoard', {
                name: 'game/updateBoard',
                data: match.getMatchInfos()
            });
        })
        .catch(err => res.status(400).json({
            message: err.message
        }));
}

export const infospartie = (req, res) => {
    res.json(match.getMatchInfos());
}

export const infosjoueur = (req, res) => {
    var player = {username: req.params.username};
    if (!match.playerExist(player))
        return res.status(404).json({
            message: 'Joueur non trouvé'
        });
    res.json(match.getPlayerInfos(player));
}