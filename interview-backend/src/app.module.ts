import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityController } from './city/city.controller';
import { CityModule } from './city/city.module';
import { CityService } from './city/city.service';

@Module({
  imports: [CityModule],
  controllers: [AppController, CityController],
  providers: [AppService, CityService],
})
export class AppModule { }
