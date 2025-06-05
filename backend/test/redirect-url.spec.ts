import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from 'supertest';

describe('Redirect short URL (e2e)', () => {
    let app: INestApplication;
  
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('redirects to the original URL', async () => {
      const uniqueAlias = `openai-${Date.now()}`;

      const { body } = await request(app.getHttpServer())
        .post('/shorten')
        .send({
          originalUrl: 'https://openai.com',
          alias: uniqueAlias,
        });
  
      expect(body.shortUrl).toContain(`/${uniqueAlias}`);
  
      const res = await request(app.getHttpServer())
        .get(`/${uniqueAlias}`)
        .redirects(0);

      expect(res.status).toBe(302);
      expect(res.headers.location).toBe('https://openai.com');
    });
  
    it('returns 404 for unknown short code', async () => {
      const res = await request(app.getHttpServer())
        .get('/nonexistent-code')
        .redirects(0);
  
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Link expired or not found');
    });
  
    afterAll(async () => {
      await app.close();
    });
  });