import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlRepository } from "../url.repository";

@Injectable()
export class GetAnalyticsUseCase {
    constructor(private readonly repository: UrlRepository) { }

    async execute(shortCode: string) {
        const data = await this.repository.getAnalytics(shortCode);
        if (!data) throw new NotFoundException('Short URL not found');

        return {
            clickCount: data.clickCount,
            redirects: data.redirects.map(r => ({
                ip: r.ip,
                timestamp: r.timestamp,
            })),
        };
    }
}