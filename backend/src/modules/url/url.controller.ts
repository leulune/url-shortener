import { BadRequestException, Body, Controller, Delete, Get, GoneException, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    @Post('shorten')
    async createShortUrl(@Body() dto: CreateUrlDto) {
        const result = await this.urlService.createShortUrl(dto);
        if (!result) {
            throw new BadRequestException('Alias already exists');
        }
        return result;
    }

    @Get('links')
    async getAllLinks() {
        return this.urlService.getAllLinks();
    }

    @Get(':shortCode')
    async redirectToOriginal(
        @Param('shortCode') shortCode: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'unknown';

        try {
            const originalUrl = await this.urlService.handleRedirect(shortCode, ip);
            return res.redirect(originalUrl);
        } catch (err) {
            if (err instanceof GoneException || err instanceof NotFoundException) {
                return res.status(404).json({ message: 'Link expired or not found' });

            }
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    @Get('info/:shortCode')
    async getInfo(@Param('shortCode') shortCode: string) {
        return this.urlService.getByShortCode(shortCode);
    }

    @Get('analytics/:shortCode')
    async getAnalytics(@Param('shortCode') shortCode: string) {
        return this.urlService.getAnalytics(shortCode);
    }

    @Delete('delete/:shortCode')
    async delete(@Param('shortCode') shortCode: string) {
        return this.urlService.deleteShortUrl(shortCode);
    }
}
