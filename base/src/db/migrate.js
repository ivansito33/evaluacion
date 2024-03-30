import {drizzle} from 'drizzle-orm/postgres-js'
import {migrate} from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const migrationClient= postgres(process.env.CONNECTION_STRING,{
    max:1
});
const db= drizzle(migrationClient);

const main= async()=>{
    try{
        await migrate(db,{
            migrationsFolder: './src/db/migrations'
        })
        console.log('migrations ran successfully🚀')
        process.exit(0);
        
    } catch(error){
        console.log('error corriendo', error)
        process.exit(1);

    }
}

main()