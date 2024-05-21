const OpenAI = require('openai');
const EventEmitter = require('events');

const openai = new OpenAI({ apiKey: 'sk-proj-VpoWx9hxbydMWtacix9qT3BlbkFJUeNz0FM5JGxVptcW5N6b' });

assistant_id = "asst_68PVDd0ES1BbVj3Mmjlo0JLe"
// thread_id = "thread_Ypw3eEyMhizuisAUyiRMuV5E"

module.exports = {
    requestGPT: async function requestGPT(content, thread_id) {
        const message = await openai.beta.threads.messages.create(
            thread_id,
            {
                role: "user",
                content: content
            }
        );

        return new Promise((resolve, reject) => {
            let resultData = '';  // Variable to store the result data
            const run = openai.beta.threads.runs.stream(thread_id, {
                assistant_id: assistant_id
            })
                .on('textCreated', (text) => process.stdout.write('\nassistant > '))
                .on('textDelta', (textDelta, snapshot) => {
                    process.stdout.write(textDelta.value);
                    resultData += textDelta.value;  // Append data to resultData
                })
                .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
                .on('toolCallDelta', (toolCallDelta, snapshot) => {
                    if (toolCallDelta.type === 'code_interpreter') {
                        if (toolCallDelta.code_interpreter.input) {
                            process.stdout.write(toolCallDelta.code_interpreter.input);
                            resultData += toolCallDelta.code_interpreter.input;  // Append data to resultData
                        }
                        if (toolCallDelta.code_interpreter.outputs) {
                            process.stdout.write("\noutput \n");
                            toolCallDelta.code_interpreter.outputs.forEach(output => {
                                if (output.type === "logs") {
                                    process.stdout.write(`\n${output.logs}\n`);
                                    resultData += output.logs;  // Append data to resultData
                                }
                            });
                        }
                    }
                })
                .on('end', () => {
                    resolve(resultData);  // Resolve with the collected data
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    },

    createThread: async function createThread() {
        const thread = await openai.beta.threads.create();
        console.log(thread.id);
        return thread.id;
    }
};