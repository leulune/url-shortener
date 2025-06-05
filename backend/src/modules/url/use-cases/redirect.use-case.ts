import { GoneException, Injectable, NotFoundException } from "@nestjs/common";
import { UrlRepository } from "../url.repository";

@Injectable()
export class RedirectUseCase {
    constructor(private readonly repository: UrlRepository) { }

    async execute(shortCode: string, ip: string) {
        const url = await this.repository.findByShortCode(shortCode);
        if (!url) throw new NotFoundException('Short URL not found');

        if (url.expiresAt && url.expiresAt < new Date()) {
            throw new GoneException();
        }

        await this.repository.incrementClickAndTrackRedirect(url.id, ip);
        return url.originalUrl;
    }
}