import { Document } from 'mongoose';    

export interface Player extends Document {
    readonly phoneNumber: string;
    readonly email: string;
    name: string;
    position: string;
    nationality: string;
    age: number;
    ranking: string;
    positionRanking: number;
    urlPhotoPlayer: string;
}