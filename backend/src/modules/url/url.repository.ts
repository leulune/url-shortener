import { Injectable } from "@nestjs/common";
import { Redirect, ShortUrl } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UrlRepository {
    constructor(private readonly prisma: DatabaseService) { }

    async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
        return this.prisma.shortUrl.findUnique({
            where: { shortCode },
        });
    }

    async createShortUrl(data: {
        originalUrl: string;
        shortCode: string;
        expiresAt: Date;
    }): Promise<ShortUrl> {
        return this.prisma.shortUrl.create({ data });
    }

    async deleteByShortCode(shortCode: string): Promise<void> {
        await this.prisma.shortUrl.delete({ where: { shortCode } });
    }

    async deleteExpired(): Promise<number> {
        const result = await this.prisma.shortUrl.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                }
            }
        })
        return result.count;
    }

    async getAll(): Promise<ShortUrl[]> {
        return this.prisma.shortUrl.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async incrementClickAndTrackRedirect(shortUrlId: string, ip: string): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.redirect.create({
                data: {
                    ip,
                    shortUrlId,
                },
            }),
            this.prisma.shortUrl.update({
                where: { id: shortUrlId },
                data: { clickCount: { increment: 1 } },
            }),
        ]);
    }

    async getAnalytics(shortCode: string): Promise<{
        clickCount: number;
        redirects: Redirect[];
    } | null> {
        const url = await this.prisma.shortUrl.findUnique({
            where: { shortCode },
            include: {
                redirects: {
                    orderBy: { timestamp: 'desc' },
                    take: 5,
                },
            },
        });

        if (!url) return null;

        return {
            clickCount: url.clickCount,
            redirects: url.redirects,
        };
    }
}