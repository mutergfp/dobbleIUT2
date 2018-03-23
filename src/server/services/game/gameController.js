import { genMiddleCard, genStarterPack } from './cardGeneration';

export const testGenMiddleCard = (req ,res) => {
    genMiddleCard([[1,2,3,4,5,6,7,8], [1,2,3,4,5,6,7,9]])
        .then(response => response.data)
        .then(data => res.json(data))
        .catch(err => res.json({
            message: err.message
        }));
}

export const testGenStarterPack = (req ,res) => {
    genStarterPack(2)
        .then(response => response.data)
        .then(data => res.json(data))
        .catch(err => res.json({
            message: err.message
        }));
}


