import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlRepository } from "../url.repository";

@Injectable()
export class GetShortUrlInfoUseCase {
    constructor(private readonly repository: UrlRepository) { }

    async execute(shortCode: string) {
        const info = await this.repository.findByShortCode(shortCode);
        if (!info) throw new NotFoundException('Short URL not found');

        return {
            originalUrl: info.originalUrl,
            createdAt: info.createdAt,
            expiresAt: info.expiresAt,
            clickCount: info.clickCount,
        };
    }
}