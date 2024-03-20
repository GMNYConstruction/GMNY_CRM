-- CreateTable
CREATE TABLE "accidents" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "report" VARCHAR NOT NULL,
    "efroi" VARCHAR NOT NULL,
    "witness" TEXT NOT NULL,
    "correspondence" TEXT NOT NULL,
    "notice" TEXT NOT NULL,
    "accidentDescription" TEXT NOT NULL,
    "accidentLocation" VARCHAR NOT NULL,
    "assignedToCompany" VARCHAR NOT NULL,
    "backToWork" VARCHAR NOT NULL,
    "companyName" VARCHAR NOT NULL,
    "dateOfAccident" VARCHAR NOT NULL,
    "documentFolder" VARCHAR NOT NULL,
    "firstCheck" VARCHAR NOT NULL,
    "lastCheck" VARCHAR NOT NULL,
    "lastDayOfWork" VARCHAR NOT NULL,

    CONSTRAINT "accidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "caseid" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "dateCreated" VARCHAR NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "accessLvl" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "public_comments_caseid_fkey" FOREIGN KEY ("caseid") REFERENCES "accidents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "public_comments_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
