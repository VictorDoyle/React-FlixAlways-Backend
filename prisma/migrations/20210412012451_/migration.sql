-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMovieConnection" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "userId" INTEGER,
    "liked" BOOLEAN DEFAULT false,
    "saved" BOOLEAN DEFAULT false,
    "watched" BOOLEAN DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL,
    "categoryId" SERIAL NOT NULL,
    "title" TEXT,
    "original_language" TEXT,
    "release_date" TEXT,
    "vote_average" DOUBLE PRECISION,
    "image" TEXT,
    "overview" TEXT,
    "genres" INTEGER,

    PRIMARY KEY ("categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Movie.id_unique" ON "Movie"("id");

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;