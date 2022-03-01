const fs = require('fs')

async function main() {
    async function ls(path) {
        const dir = await fs.promises.opendir(path)
        // delete previouse index.ts before regenrating the needed code
        fs.unlink('./src/index.ts', (err => {
            if (err) console.log(err);
            else {
              console.log("\nDeleted file: index.txt");
            }
          })
        )

        for await (const dirent of dir) {
            if(dirent.name.includes('.proto')){
                const serviceName = dirent.name.split('.')[0]
                const exportName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1)

                const content = `
// @ts-ignore 
export * from './protos/${serviceName}'
export const ${exportName}Path = \`\${__dirname}/protos/${serviceName}.proto\``

                fs.appendFile('./src/index.ts', content, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

                const outputDirPath = __dirname.substring(0, __dirname.lastIndexOf('/'))
                // copy protos to lib file
                fs.copyFile(`${__dirname}/protos/${serviceName}.proto`, `${outputDirPath}/lib/protos/${serviceName}.proto`, (err) => {
                    if (err) throw err;
                });
            }
        }
    }

    ls('./src/protos').catch(console.error)    
}

main()