import { createConnection } from 'typeorm'
async function main(): Promise<void> {
    await createConnection()
}

main()