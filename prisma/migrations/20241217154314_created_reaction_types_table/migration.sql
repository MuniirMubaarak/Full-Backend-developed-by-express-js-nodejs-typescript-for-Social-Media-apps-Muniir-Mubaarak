/*
  Warnings:

  - You are about to drop the column `type` on the `reactions` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `reactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reactions" DROP COLUMN "type",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "reaction_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reaction_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "reaction_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
