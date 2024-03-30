import { min, relations, Table } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, decimal, foreignKey, timestamp } from "drizzle-orm/pg-core";
export const statusEnum = pgEnum('status', ['active', 'inactive']);

 export const products= pgTable('products',{
    id: serial('id').primaryKey(),
    name: varchar('name', {length:225}).unique(),
    price: decimal('price',{min:0}).notNull(),
    status:statusEnum('status').default('active')

 })

 export const productsRelations = relations(products, ({ many }) => ({
    sales_detail: many(sales_details)
}));

 export const sales = pgTable('sales', {
    id: serial('id').primaryKey(),
    quantity: integer('quantity', {  min: 1 }).notNull(),
    total: decimal('total', { min: 0 }).notNull(),
    status: statusEnum('status').default('active'),
    created_at: timestamp('created_at', {withTimezone:true}).defaultNow(),
    update_at:timestamp('created_at', {withTimezone:true}).defaultNow()
    
});

export const salesRelations = relations(sales, ({ many }) => ({
	sales_detail: many(sales_details)
}));

export const sales_details= pgTable('sales_detail',{
    id: serial('id').primaryKey(),
    quantity: integer('quantity', { min: 1 }),
    status: statusEnum('status').default('active'),
    created_at: timestamp('created_at', {withTimezone:true}).defaultNow(),
    update_at:timestamp('created_at', {withTimezone:true}).defaultNow(),
    product_id: integer('product_id').references(() => products.id, { onUpdate:'cascade', onDelete:'no action' }),
    sale_id: integer('sale_id').references(() => sales.id, { onUpdate:'cascade', onDelete:'no action' }), 
    
});


export const sales_detailRelations = relations(sales_details, ({ one }) => ({
    product: one(products, {
        fields: [sales_details.product_id],
        references: [products.id]
    }),
    sales: one(sales, {
        fields: [sales_details.sale_id],
        references: [sales.id]
    })
}))