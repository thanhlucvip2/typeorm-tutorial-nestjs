import { ClientService } from './client.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientDto } from './client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Get()
  async getClient() {
    return await this.clientService.getAllClient();
  }
  @Post()
  async createClient(@Body() body: ClientDto) {
    return this.clientService.createClient(body);
  }
}
