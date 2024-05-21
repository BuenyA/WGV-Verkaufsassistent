const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'sk-proj-VpoWx9hxbydMWtacix9qT3BlbkFJUeNz0FM5JGxVptcW5N6b' });

module.exports = {
  requestGPT: async function main(content) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: content }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
    return completion.choices[0];
  }
}