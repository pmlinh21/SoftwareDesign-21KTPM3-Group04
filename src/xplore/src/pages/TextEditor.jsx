import Editor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'

export default function TextEditor({content, setContent}){
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
        shouldNotGroupWhenFull: true,
        wordCount: {
            onUpdate: stats => {
                // Prints the current content statistics.
                // console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
            }
        }

    }

    function handleData(event, editor) {
        setContent(editor.getData())
		console.log(editor.getData())
    }

    return(
        <>
        <CKEditor
                editor={ Editor }
                config={ editorConfiguration }
                data={content}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
					editor.editing.view.change((writer) => {
						writer.setStyle(
							"height",
							"40rem",
							editor.editing.view.document.getRoot()
						);
						});
                } }

                onChange={ ( event ) => {
                } }

                onBlur={handleData}

                onFocus={ ( event, editor ) => {
                } }
        ></CKEditor>
        </>
    )
}