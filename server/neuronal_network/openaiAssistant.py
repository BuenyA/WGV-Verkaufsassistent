import openai
from dotenv import find_dontenv, load_dotenv

load_dotenv()

client = openai.OpenAI(api_key="sk-proj-VpoWx9hxbydMWtacix9qT3BlbkFJUeNz0FM5JGxVptcW5N6b")
model = "gpt-4o"

assistant_id = "asst_68PVDd0ES1BbVj3Mmjlo0JLe"

thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Guten Tag!"
        }
    ]
)

thread_id = thread.id
print(thread_id)

# ==== Create Message ==== #

message = "Was geht, alda"

message = client.beta.threads.messages.create(
    thread_id=thread_id,
    role="user",
    content=message
)

run = client.beta.threads.runs.create(
    thread_id=thread_id,
    assistant_id=assistant_id,
    instructions="Der Benutzer ist James Bond"
)