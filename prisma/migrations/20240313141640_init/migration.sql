-- CreateTable
CREATE TABLE "accidents" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "assignedtocompany" VARCHAR,
    "companyname" VARCHAR,
    "dateofaccident" VARCHAR,
    "accidentlocation" VARCHAR,
    "firstcheck" VARCHAR,
    "lastcheck" VARCHAR,
    "lastdayofwork" VARCHAR,
    "report" VARCHAR,
    "efroi" VARCHAR,
    "backtowork" VARCHAR,
    "documentfolder" VARCHAR,
    "accidentdescription" TEXT,
    "witness" TEXT,
    "correspondence" TEXT,
    "notice" TEXT,

    CONSTRAINT "accidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "caseid" BIGINT NOT NULL,
    "comment" TEXT,
    "userid" BIGINT,
    "datecreated" VARCHAR,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR,
    "name" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
