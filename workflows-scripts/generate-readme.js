const fs = require('node:fs/promises');
const path = require('node:path');

const rootPath = path.resolve('./');


const getReadmeFilePaths = async( rootPath ) => {
	const dirNamePattern = new RegExp(/^\d+-([\w_-]+)(\/README\.md)$/);

	try {
		const readmeFiles = await fs
		.readdir(rootPath, { recursive: true })
		.then( filesAndFolders => {
			return filesAndFolders.filter( x => dirNamePattern.test( x ))
		})
		return readmeFiles;

		
	} catch (error){
		console.error(`[ Error ]: ${error.message || 'reading dir'}`)
		console.error( error )
	}
}

const formatSection = filePath => {
	const truncFilePath = filePath.split('/')[0];
	const parsed = truncFilePath
		.replaceAll(/[-_]/g, ' ')
		.replaceAll(/^\d+\s/g, '')
	return parsed[0].toUpperCase() + parsed.slice(1,)
}

const getReadmeContents = async ( filePaths ) => {

	try {
		const fileContentsPromises =  filePaths.map( async x => {
			return {
				section: x,
				sectionFormatted: formatSection(x),
				content: await fs.readFile(x, { encoding: 'utf-8'})
			}
		})
		return await Promise.all( fileContentsPromises );
	} catch( error ){
		console.error(`ERROR: ${error.name}`)
		console.error(error)
	}
}

const writeToRootReadme = async( readmeFilePath, contentDetails )=> {
	try {
		for ( let contentDetailsItem of contentDetails ){
			const title = `# 📌 ${ contentDetailsItem.sectionFormatted }`;
			const sectionOpeningTag = `<details>\n\t<summary>${title}</summary>`;

			const sectionClosingTag = `\n</details>\n'`;
			
			const content = `${sectionOpeningTag}\n${contentDetailsItem.content}\n${sectionClosingTag}`
			await fs.appendFile(readmeFilePath, content )
		}
	} catch( error ){
		console.error(`ERROR: ${error.name}`)
	}
}



const generateReadmeContentPerSection = (async( rootPath ) => {

	console.info('Executing script for readme:')

	const readmeFilePaths = await getReadmeFilePaths( rootPath );
	const contentsDetails = await getReadmeContents( readmeFilePaths );
	const readmeHeader = await fs.readFile('README.header.md', { encoding: 'UTF-8'});
	const README_PATH = './README.md';
	fs.writeFile(README_PATH, readmeHeader + '\n\n\n')
	await writeToRootReadme(README_PATH, contentsDetails)

	console.info('Finished executing script for readme 🎉')

	


})(rootPath);

