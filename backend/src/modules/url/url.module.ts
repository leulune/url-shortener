import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { DatabaseModule } from 'src/database/database.module';
import { UrlRepository } from './url.repository';
import { CreateShortUrlUseCase } from './use-cases/create-short-url.use-case';
import { GetShortUrlInfoUseCase } from './use-cases/get-short-url-info.use-case';
import { RedirectUseCase } from './use-cases/redirect.use-case';
import { GetAnalyticsUseCase } from './use-cases/get-analytics.use-case';
import { DeleteShortUrlUseCase } from './use-cases/delete-short-url.use-case';
import { GetAllLinksUseCase } from './use-cases/get-all-links.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [
    UrlService, 
    UrlRepository,
    CreateShortUrlUseCase,
    GetShortUrlInfoUseCase,
    RedirectUseCase,
    GetAnalyticsUseCase,
    DeleteShortUrlUseCase,
    GetAllLinksUseCase,
  ],
  exports: [
    UrlService,
    UrlRepository,
    CreateShortUrlUseCase,
    GetShortUrlInfoUseCase,
    RedirectUseCase,
    GetAnalyticsUseCase,
    DeleteShortUrlUseCase,
    GetAllLinksUseCase,
  ]
})
export class UrlModule {}
