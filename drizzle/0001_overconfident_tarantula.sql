ALTER TABLE "users" ADD COLUMN "forname" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pseudo" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "date_of_birth" date NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_pseudo_unique" UNIQUE("pseudo");