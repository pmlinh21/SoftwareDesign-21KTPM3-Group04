import { AITextAdapter, AITextAdapterRequestData } from '@ckeditor/ckeditor5-ai';
export default class CustomAITextAdapter extends AITextAdapter {
    sendRequest(requestData: AITextAdapterRequestData): Promise<void>;
}
