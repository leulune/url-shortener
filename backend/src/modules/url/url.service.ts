import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
import { CreateShortUrlUseCase } from './use-cases/create-short-url.use-case';
import { GetShortUrlInfoUseCase } from './use-cases/get-short-url-info.use-case';
import { RedirectUseCase } from './use-cases/redirect.use-case';
import { GetAnalyticsUseCase } from './use-cases/get-analytics.use-case';
import { DeleteShortUrlUseCase } from './use-cases/delete-short-url.use-case';
import { GetAllLinksUseCase } from './use-cases/get-all-links.use-case';

@Injectable()
export class UrlService {
    constructor(
        private readonly createShortUrlUseCase: CreateShortUrlUseCase,
        private readonly getShortUrlInfoUseCase: GetShortUrlInfoUseCase,
        private readonly handleRedirectUseCase: RedirectUseCase,
        private readonly getAnalyticsUseCase: GetAnalyticsUseCase,
        private readonly deleteShortUrlUseCase: DeleteShortUrlUseCase,
        private readonly getAllLinksUseCase: GetAllLinksUseCase,
    ) { }

    createShortUrl(dto: CreateUrlDto) {
        return this.createShortUrlUseCase.execute(dto);
    }

    getByShortCode(shortCode: string) {
        return this.getShortUrlInfoUseCase.execute(shortCode);
    }

    handleRedirect(shortCode: string, ip: string) {
        return this.handleRedirectUseCase.execute(shortCode, ip);
    }

    getAnalytics(shortCode: string) {
        return this.getAnalyticsUseCase.execute(shortCode);
    }

    deleteShortUrl(shortCode: string) {
        return this.deleteShortUrlUseCase.execute(shortCode);
    }

    getAllLinks() {
        return this.getAllLinksUseCase.execute();
    }
}
