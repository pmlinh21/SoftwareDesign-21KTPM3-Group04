createDialog().then( config => {
	return ClassicEditor
		.create( document.querySelector( '.editor' ), {
			licenseKey: config.licenseKey
		} )
		.then( editor => {
			window.editor = editor;
		} )
		.catch( handleSampleError );
} );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "1cunxmbtx6wr-z2xle78xxcan" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
