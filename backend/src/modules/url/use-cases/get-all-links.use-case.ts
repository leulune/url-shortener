import { Injectable } from "@nestjs/common";
import { UrlRepository } from "../url.repository";

@Injectable()
export class GetAllLinksUseCase {
    constructor(private readonly repository: UrlRepository) { }

    async execute() {
        return this.repository.getAll();
    }
}
