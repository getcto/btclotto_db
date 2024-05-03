/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `ticket_results` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ticket_results_sessionId_key` ON `ticket_results`(`sessionId`);
