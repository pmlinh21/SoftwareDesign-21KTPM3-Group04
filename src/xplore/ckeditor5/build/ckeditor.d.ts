/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { AIAssistant, OpenAITextAdapter } from '@ckeditor/ckeditor5-ai';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { FontColor, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageInsert, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof AIAssistant | typeof Alignment | typeof Autoformat | typeof BlockQuote | typeof Bold | typeof Code | typeof CodeBlock | typeof Essentials | typeof FindAndReplace | typeof FontColor | typeof FontSize | typeof Heading | typeof Image | typeof ImageCaption | typeof ImageInsert | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Italic | typeof Link | typeof List | typeof MediaEmbed | typeof Paragraph | typeof OpenAITextAdapter | typeof SelectAll | typeof Strikethrough | typeof Subscript | typeof Superscript | typeof Underline | typeof Undo | typeof WordCount)[];
    static defaultConfig: EditorConfig;
}
export default Editor;
