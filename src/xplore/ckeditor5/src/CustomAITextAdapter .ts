import { AITextAdapter, AITextAdapterRequestData } from '@ckeditor/ckeditor5-ai';

export default class CustomAITextAdapter extends AITextAdapter {
    public async sendRequest( requestData: AITextAdapterRequestData ) {
        // const prompt = requestData.query + '\n\n' + requestData.context;
        const newRequestData = {
            model: 'gpt-3.5-turbo',
            max_tokens: 2000,
            temperature: 1,
            top_p: 1,
            stream: true,
            messages: [

                {
                    role: 'user',
                    content: `Instruction:\n${requestData.query}\nContent:\n${requestData.context}`
                }
              ],
        }

        const response = await fetch('http://localhost:8080/api/auth/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Adjust content type if needed
                },
                body: JSON.stringify(newRequestData) // Send requestData in the body of the POST request
        });

        const responseText = await response.text();
        const result = JSON.parse(responseText);
        requestData.onData( result.message );
    }
}


