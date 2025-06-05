import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UrlModule } from './modules/url/url.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './modules/cron/cron.module';

@Module({
  imports: [
    DatabaseModule, 
    UrlModule,
    CronModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
