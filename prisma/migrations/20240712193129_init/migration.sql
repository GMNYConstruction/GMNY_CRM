-- CreateTable
CREATE TABLE "accidents" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "report" VARCHAR,
    "efroi" VARCHAR,
    "witness" TEXT,
    "correspondence" TEXT,
    "notice" TEXT,
    "accidentDescription" TEXT,
    "assignedToCompany" TEXT,
    "backToWork" VARCHAR,
    "dateOfAccident" VARCHAR,
    "documentFolder" VARCHAR,
    "firstCheck" VARCHAR,
    "lastCheck" VARCHAR,
    "lastDayOfWork" VARCHAR,
    "companyWeWorkedFor" VARCHAR,
    "lastModified" DATE,
    "accidentLocation" VARCHAR,

    CONSTRAINT "accidentsrep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "caseid" INTEGER,
    "comment" TEXT,
    "userid" INTEGER,
    "dateCreated" VARCHAR,

    CONSTRAINT "comments_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "accessLvl" TEXT NOT NULL,
    "status" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "public_comments_caseid_fkey" FOREIGN KEY ("caseid") REFERENCES "accidents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "public_comments_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
