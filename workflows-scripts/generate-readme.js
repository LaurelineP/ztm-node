const fs = require('node:fs/promises');
const path = require('node:path');

const rootPath = path.resolve('./');

const checkFileExists = async filePath => {
	try {
		await fs.access( filePath, fs.constants.F_OK);
		return true
	} catch( error ) {
		console.error('[ ERROR - FILE ]: file does not exists');
		return false
	}
}


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

const formatFolderRelPathTitle = filePath => {
	const truncFilePath = filePath.split('/')[0];
	const parsed = truncFilePath
		.replaceAll(/[-_]/g, ' ')
		.replaceAll(/^\d+\s/g, '')
	return parsed.toUpperCase()
}

const getReadmeContents = async ( filePaths ) => {
	try {
		const fileContentsPromises =  filePaths.map( async x => {
			return {
				folderRelPath: x,
				folderNameFormatted: formatFolderRelPathTitle(x),
				content: await fs.readFile(x, { encoding: 'utf-8'})
			}
		})
		return await Promise.all( fileContentsPromises );
	} catch( error ){
		console.error(`[ ERROR - getReadmeContents ]: ${error.name}`)
		console.error(error)
	}
}

const writeToRootReadme = async( readmeFilePath, contentDetails )=> {
	try {
		for ( let contentDetailsItem of contentDetails ){
			const title = `📌 ${ contentDetailsItem.folderNameFormatted }`;
			const innerReadmePath = contentDetailsItem.folderRelPath;
			let folderRelPathOpeningTag = `<details>\n\t<summary>${title}</summary>`;
			folderRelPathOpeningTag += `\n[Need to update this part of the Readme?](./${ innerReadmePath })\n`


			const folderRelPathClosingTag = `\n</details>\n`;
			
			const content = `${folderRelPathOpeningTag}\n${contentDetailsItem.content}\n${folderRelPathClosingTag}`
			await fs.appendFile(readmeFilePath, content )
		}
	} catch( error ){
		console.error(`[ ERROR - writeToRootReadme ] : ${error.name}`)
	}
}



const generateReadme = (async( rootPath ) => {
	const README_PATH 			= './README.md';
	const README_HEADER_PATH 	= './README.header.md';


	console.info('Executing script for readme...')

	const readmeFilePaths = await getReadmeFilePaths( rootPath );
	const contentsDetails = await getReadmeContents( readmeFilePaths );

	const doesReadmeHeaderExists = await checkFileExists( README_HEADER_PATH )
	const readmeHeader 	  = doesReadmeHeaderExists
		&& await fs.readFile(README_HEADER_PATH, { encoding: 'UTF-8' });

	const writeFileArgs = doesReadmeHeaderExists
		? [ README_PATH, readmeHeader + '\n\n\n']
		: [ README_PATH, '\n'];

	try {
		// overriding content
		await fs.writeFile(...writeFileArgs)
		await writeToRootReadme( README_PATH, contentsDetails )
	} catch( error ){
		console.error( '[ ERROR - MAIN ]: failing generating readme')
	}

	console.info('Finished executing script for readme 🎉')
})(rootPath);

