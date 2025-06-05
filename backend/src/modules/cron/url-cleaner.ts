import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UrlRepository } from "src/modules/url/url.repository";

@Injectable()
export class UrlCleaner {
    constructor(private readonly urlRepo: UrlRepository) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async run() {
        const deleted = await this.urlRepo.deleteExpired();
        console.log(`[CRON] Deleted ${deleted} expired short URLs`);
    }
}