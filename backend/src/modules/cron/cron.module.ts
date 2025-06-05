import { Module } from '@nestjs/common';
import { UrlCleaner } from './url-cleaner';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [UrlModule],
  providers: [UrlCleaner],
})
export class CronModule {}
