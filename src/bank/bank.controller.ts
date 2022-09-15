import { BankDto } from './bank.dto';
import { BankService } from './bank.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}
  @Get()
  getAllBank() {
    return this.bankService.getBank();
  }
  @Post()
  createBank(@Body() body: BankDto) {
    return this.bankService.createBank(body);
  }
}
