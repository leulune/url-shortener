import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlRepository } from "../url.repository";

@Injectable()
export class DeleteShortUrlUseCase {
    constructor(private readonly repository: UrlRepository) { }

    async execute(shortCode: string) {
        const url = await this.repository.findByShortCode(shortCode);
        if (!url) throw new NotFoundException('Short URL not found');

        await this.repository.deleteByShortCode(shortCode);
        return { message: "Short URL successfully deleted" };
    }
}