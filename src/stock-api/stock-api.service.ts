import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { from, map, mergeMap, Observable, reduce } from 'rxjs';

const BASE_URL = 'http://api.marketstack.com/v1';

@Injectable()
export class StockApiService {
  constructor(
    private readonly httpService: HttpService
  ) {}
  findAllTickers(): any {
    const req = this.httpService
      .get(`${BASE_URL}/tickers?access_key=${process.env.STOCK_API_TOKEN}&limit=10`)
      // .get(`${BASE_URL}/tickers/AAPL/intraday/latest?access_key=${process.env.STOCK_API_TOKEN}`)
      // .pipe(
      //   mergeMap(response => {
      //     return this.httpService.get(`${BASE_URL}/tickers/${response.data.symbol}?access_key=${process.env.STOCK_API_TOKEN}`);
      //   }),
      // )
      .pipe(
        map(resp => resp.data.data.map(ticker => ticker.symbol)),
        mergeMap(tickers => {
          return this.httpService
          .get(`${BASE_URL}/intraday/latest?access_key=${process.env.STOCK_API_TOKEN}&symbols=${tickers}`)
          .pipe(
            map(resp => resp.data.data)
          )
        })
      )
    return req;
  }

  findMovers(showMarketLosers: boolean): any {
    const params = {
      region: 'US'
    }
    return this.request('get', 'https://yh-finance.p.rapidapi.com/market/v2/get-movers', params)
                .pipe(
                  mergeMap((resp: any) => {
                    const tickers = resp.finance.result[showMarketLosers ? 1 : 0].quotes.map(quote => quote.symbol).join(',');

                    return this.request(
                      'get',
                      'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
                      {
                        ...params,
                        symbols: tickers
                      }
                    )
                  })
                );
  }

  private request(method: string, url: string, params: Object) {
    const headers = {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_TOKEN
    }
    return this.httpService[method](url, {
        headers,
        params
      }
    ).pipe(
      map((resp: AxiosResponse) => {
        return resp.data;
    })
    )
  }
}
