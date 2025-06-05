import { Injectable } from "@nestjs/common";
import { nanoid } from "nanoid";
import { CreateUrlDto } from "../dto/create-url.dto";
import { UrlRepository } from "../url.repository";

@Injectable()
export class CreateShortUrlUseCase {
    constructor(private readonly repository: UrlRepository) { }

    async execute(dto: CreateUrlDto) {
        const shortCode = dto.alias || nanoid(8);

        const existing = await this.repository.findByShortCode(shortCode);
        if (existing) {
            return null;
        }

        const defaultExpirationMs = 5 * 60 * 1000; // 5 мин 
        const expiresAt = dto.expiresAt
            ? new Date(dto.expiresAt)
            : new Date(Date.now() + defaultExpirationMs);

        const created = await this.repository.createShortUrl({
            originalUrl: dto.originalUrl, shortCode, expiresAt,
        });

        return {
            shortUrl: `${process.env.BASE_URL}/${created.shortCode}`,
        }
    }
}