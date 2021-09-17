import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
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
}
