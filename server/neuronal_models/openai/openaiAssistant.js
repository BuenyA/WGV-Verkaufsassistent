const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'sk-proj-VpoWx9hxbydMWtacix9qT3BlbkFJUeNz0FM5JGxVptcW5N6b' });

// assistant_id = "asst_68PVDd0ES1BbVj3Mmjlo0JLe" // WGV-Verkaufsassistent 1.0
// assistant_id = "asst_FpF86n8djLT181R93u3DGJ4X" // WGV-Verkaufsassistent 2.0
assistant_id = "asst_zHCy0ZeRqdium3h9cS3dqGBU" // WGV-Verkaufsassistent 3.0

module.exports = {
    requestGPT: async function requestGPT(content, thread_id) {
        const message = await openai.beta.threads.messages.create(
            thread_id,
            {
                role: "user",
                content: content
            }
        );

        const results = [];

        const run = openai.beta.threads.runs.stream(thread_id, {
            assistant_id: assistant_id
        })
            .on('textCreated', (text) => {
                const textOutput = `\n${text}`;
                process.stdout.write(textOutput);
            })
            .on('textDelta', (textDelta, snapshot) => {
                const textDeltaOutput = textDelta.value;
                process.stdout.write(textDeltaOutput);
                results.push(textDeltaOutput);
            })
            .on('toolCallCreated', (toolCall) => {
                const toolCallOutput = `\n${toolCall.type}\n\n`;
                process.stdout.write(toolCallOutput);
                results.push(toolCallOutput);
            })
            .on('toolCallDelta', (toolCallDelta, snapshot) => {
                if (toolCallDelta.type === 'code_interpreter') {
                    if (toolCallDelta.code_interpreter.input) {
                        const inputOutput = toolCallDelta.code_interpreter.input;
                        process.stdout.write(inputOutput);
                        results.push(inputOutput);
                    }
                    if (toolCallDelta.code_interpreter.outputs) {
                        process.stdout.write("\noutput \n");
                        toolCallDelta.code_interpreter.outputs.forEach(output => {
                            if (output.type === "logs") {
                                const logOutput = `\n${output.logs}\n`;
                                process.stdout.write(logOutput);
                                results.push(logOutput);
                            }
                        });
                    }
                }
            });

        return new Promise((resolve) => {
            run.on('end', () => {
                resolve(results);
            });
        });
    },

    createThread: async function createThread() {
        const thread = await openai.beta.threads.create();
        console.log(thread.id);
        return thread.id;
    }
}