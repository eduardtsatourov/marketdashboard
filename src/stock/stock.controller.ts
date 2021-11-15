import { Controller, Get, Query, Request } from '@nestjs/common';
import { StockApiService } from 'src/stock-api/stock-api.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockApi: StockApiService
  ) {}

  @Get()
  findAll(@Query() sort) {
    console.log(sort)
    return this.stockApi.findAllTickers();
  }

  @Get('movers')
  findMovers(@Request() req) {
    return this.stockApi.findMovers(req.user.showMarketLosers);
  }
}
