DO $$ BEGIN
 CREATE TYPE "statusEnum" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(225),
	"price" numeric NOT NULL,
	"status" "statusEnum" DEFAULT 'active',
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"total" numeric NOT NULL,
	"status" "statusEnum" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales_detail" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer,
	"status" "statusEnum" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now(),
	"produtct_id" integer,
	"sale_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sales_detail" ADD CONSTRAINT "sales_detail_produtct_id_products_id_fk" FOREIGN KEY ("produtct_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sales_detail" ADD CONSTRAINT "sales_detail_sale_id_sales_id_fk" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
