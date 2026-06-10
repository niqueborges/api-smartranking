import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const { email } = createPlayerDto;
    return JSON.stringify({
      email: email,
    });
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }

  @Get(':email')
  async getPlayerByEmail(
    @Param('email', PlayersValidationParametersPipe) email: string,
  ): Promise<Player> {
    return this.playersService.getPlayerByEmail(email);
  }

  @Delete(':email')
  async deletePlayer(
    @Param('email', PlayersValidationParametersPipe) email: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(email);
  }
}
