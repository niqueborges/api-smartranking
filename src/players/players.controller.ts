import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto) {
        const { email } = createPlayerDto;
        return JSON.stringify({
            "email": email
        });
    }

    @Get()
    async getAllPlayers(): Promise<Player[]> {
        return this.playersService.getAllPlayers();
    }

    @Get(':email')
    async getPlayerByEmail(@Param('email') email: string): Promise<Player> {
        return this.playersService.getPlayerByEmail(email);
    }

    @Delete(':email')
    async deletePlayer(@Param('email') email: string): Promise<void> {
        return this.playersService.deletePlayer(email);
    }

}



        
