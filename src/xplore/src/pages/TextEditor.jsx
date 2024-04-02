import Editor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'

export default function TextEditor(){
    const editorConfiguration = {
        toolbar: {
			items: [
				'undo',
				'redo',
				'heading',
				'|',
				'fontSize',
				'fontColor',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'code',
				'superscript',
				'subscript',
                '|',
				'alignment',
				'bulletedList',
				'numberedList',
                '|',
				'link',
				'blockQuote',
				'codeBlock',
				'imageInsert',
				'imageUpload',
				'mediaEmbed',
                '|',
				'selectAll',
				'findAndReplace',
				'aiCommands',
				'aiAssistant'
			]
		},
		language: 'en',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
        
        licenseKey: 'b3lIK3VyOFdJOFZVanBtRE94V3hET3h2WS95N3RsVERKZllUWVhUZWM5SjZPSC81Qm16Rm9VOU4rSWNDLU1qQXlOREEwTWpjPQ==',
        shouldNotGroupWhenFull: true,
        wordCount: {
            onUpdate: stats => {
                // Prints the current content statistics.
                // console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
            }
        }

    }

    return(
        <>
        <CKEditor
                editor={ Editor }
                config={ editorConfiguration }
                data=""
                
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }

                onChange={ ( event ) => {
                    // console.log( event );
                } }

                onBlur={ ( event, editor ) => {
                    // console.log( 'Blur.', editor );
                } }

                onFocus={ ( event, editor ) => {
                    // console.log( 'Focus.', editor );
                } }
        ></CKEditor>
        </>
    )
}