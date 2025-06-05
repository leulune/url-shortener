import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from 'supertest';

describe('Short URL creation with alias', () => {
    let app: INestApplication;
  
    beforeAll(async () => { 
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('creates a short URL with a custom alias', async () => {
      const alias = `myalias-${Date.now()}`;

      const response = await request(app.getHttpServer())
        .post('/shorten')
        .send({
          originalUrl: 'https://example.com',
          alias,
        });
  
      expect(response.status).toBe(201);
      expect(response.body.shortUrl).toContain(`/${alias}`);
    });
  
    it('returns an error if alias already exists', async () => {
      const alias = `conflict-alias-${Date.now()}`;

      await request(app.getHttpServer())
        .post('/shorten')
        .send({ 
          originalUrl: 'https://example.com', 
          alias, 
        });

      const response = await request(app.getHttpServer())
        .post('/shorten')
        .send({
          originalUrl: 'https://example.com/another',
          alias,
        });
  
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Alias already exists');
    });
  
    afterAll(async () => {
      await app.close();
    });
  });
  