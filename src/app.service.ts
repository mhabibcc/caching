import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';
import { BodyDTO } from './dto/body.dto';

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(){
    return this.cacheManager.get('key').then((v)=>{
      console.log(`ini isinya ${v}`);
      return `ini isinya ${v}`;
    }).catch((e)=>{
      return e;
    })
  }

  setCache(body:BodyDTO) {
    this.cacheManager.set('key',body.value,{ttl:100});
    console.log(`disimpan ${body.value} selama 100 detik`);
    return `disimpan ${body.value} selama 100 detik`;
  }

  cache(req: Request, res: Response, body:BodyDTO) {


    this.cacheManager.get(`block.${req.ip}.${body.value}`).then((ress: any) => {
      console.log(`block key: block.${req.ip}.${body.value}, value: ${ress}`);
      if(ress){
        const ttl = (( ress.ttl * 1000) - (Date.now() - ress.date)) / 1000;
        return res.status(HttpStatus.TOO_MANY_REQUESTS).json({

              "status": false,
              "message": "to many attemps",
              "try_after": parseInt(ttl.toFixed())
            }).send();
      }
      else{
        this.cacheManager.get(`inc.${req.ip}.${body.value}`).then((value: number) => {
          console.log(`key : inc.${req.ip}.${body.value}, value : ${value}`)
        
          if (value == undefined) {
            this.cacheManager.set(`inc.${req.ip}.${body.value}`, 1, { ttl: 5000 });
          }
          else {
            const date = Date.now();
            if (value == 2) {
              this.cacheManager.set(`block.${req.ip}.${body.value}`, {"date" : date, "ttl" : 120}, { ttl: 120 });
            }
            else if (value == 4) {
              this.cacheManager.set(`block.${req.ip}.${body.value}`, {"date" : date, "ttl" : 300}, { ttl: 300 });
            }
    
            this.cacheManager.set(`inc.${req.ip}.${body.value}`, 1 + value, { ttl: 5000 });
          }
        });

        return res.status(HttpStatus.OK).json({

          "status": true,
          "message": "lagi"
        }).send();

      }
    }).catch((e)=>{
      console.log(e);
    });


  }
}
