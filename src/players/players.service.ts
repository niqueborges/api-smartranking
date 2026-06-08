import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerFound = this.players.find(
      player => player.email === email,
    );

    if (playerFound) {
      this.update(playerFound, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

    async getAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const playerFound = this.players.find(
      player => player.email === email,
    );
    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerFound = this.players.find(
      player => player.email === email,
    );
    
    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    this.players = this.players.filter(
      player => player.email !== playerFound.email,
    );
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;
    const player: any = {
        _id: uuidv4(),
        name,
        phoneNumber,
        email,
        ranking: 'A',
        positionRanking: 1,
        urlPhotoPlayer: 'www.google.com.br/foto123.jpg',
        position: '',
        nationality: '',
        age: 0
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(playerFound: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;
    playerFound.name = name;
  }
}
