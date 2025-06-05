-- DropForeignKey
ALTER TABLE "Redirect" DROP CONSTRAINT "Redirect_shortUrlId_fkey";

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "ShortUrl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
