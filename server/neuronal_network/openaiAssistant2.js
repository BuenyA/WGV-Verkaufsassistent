const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'sk-proj-VpoWx9hxbydMWtacix9qT3BlbkFJUeNz0FM5JGxVptcW5N6b' });

assistant_id = "asst_68PVDd0ES1BbVj3Mmjlo0JLe"
thread_id = "thread_Ypw3eEyMhizuisAUyiRMuV5E"

/* module.exports = {
    requestGPT: async function sendMessage(content) {
        const message = await openai.beta.threads.messages.create(
            thread_id,
            {
                role: "user",
                content: content
            }
        )

        const run = openai.beta.threads.runs.stream(thread_id, {
            assistant_id: assistant_id
        })
            .on('textCreated', (text) => process.stdout.write('\nassistant > '))
            .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
            .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
            .on('toolCallDelta', (toolCallDelta, snapshot) => {
                if (toolCallDelta.type === 'code_interpreter') {
                    if (toolCallDelta.code_interpreter.input) {
                        process.stdout.write(toolCallDelta.code_interpreter.input);
                    }
                    if (toolCallDelta.code_interpreter.outputs) {
                        process.stdout.write("\noutput >\n");
                        toolCallDelta.code_interpreter.outputs.forEach(output => {
                            if (output.type === "logs") {
                                process.stdout.write(`\n${output.logs}\n`);
                            }
                        });
                    }
                }
            });
    }
} */

module.exports = {
    requestGPT: async function sendMessage(content) {
        const message = await openai.beta.threads.messages.create(
            thread_id,
            {
                role: "user",
                content: content
            }
        );

        return new Promise((resolve, reject) => {
            const run = openai.beta.threads.runs.stream(thread_id, {
                assistant_id: assistant_id
            })
                .on('textCreated', (text) => process.stdout.write('\nassistant > '))
                .on('textDelta', (textDelta, snapshot) => {
                    process.stdout.write(textDelta.value);
                })
                .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
                .on('toolCallDelta', (toolCallDelta, snapshot) => {
                    if (toolCallDelta.type === 'code_interpreter') {
                        if (toolCallDelta.code_interpreter.input) {
                            process.stdout.write(toolCallDelta.code_interpreter.input);
                        }
                        if (toolCallDelta.code_interpreter.outputs) {
                            process.stdout.write("\noutput \n");
                            toolCallDelta.code_interpreter.outputs.forEach(output => {
                                if (output.type === "logs") {
                                    process.stdout.write(`\n${output.logs}\n`);
                                }
                            });
                        }
                    }
                })
                .on('end', (result) => {
                    resolve(result);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }
};
