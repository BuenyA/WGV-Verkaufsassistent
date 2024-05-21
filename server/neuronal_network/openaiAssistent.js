const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'sk-proj-VpoWx9hxbydMWtacix9qT3BlbkFJUeNz0FM5JGxVptcW5N6b' });

async function createAssistantThreat() {
    return await openai.beta.threads.create();
}

async function test2(/* thread, */content="Guten Tag") {

    // const thread = await openai.beta.threads.create();
    const thread = { id: 'thread_5Milm6X9kKgsfjfieDwoD8R8', object: 'thread', created_at: 1716160851, metadata: {}, tool_resources: {} };

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: content
        }
    )

    let run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        { 
          assistant_id: "asst_68PVDd0ES1BbVj3Mmjlo0JLe",
          instructions: "Der Benutzer heißt Jonas."
        }
    );
    
    if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
          run.thread_id
        );
        for (const message of messages.data.reverse()) {
          console.log(`${message.role} > ${message.content[0].text.value}`);
        }
      } else {
        console.log(run.status);
    }

    console.log(thread.id);
}

// main(/* createAssistantThreat() */);
test2();