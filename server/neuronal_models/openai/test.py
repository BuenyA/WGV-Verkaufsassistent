import openai

# Definiere eine Funktion zur Interaktion mit dem Chatbot
def get_user_input(prompt="Guten Tag"):
    response = openai.Completion.create(
        engine="gpt-4",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return response.choices[0].text.strip()

def main():
    user_data = {}

    user_data['name'] = get_user_input("Bitte geben Sie Ihren Namen ein:")
    user_data['age'] = get_user_input("Bitte geben Sie Ihr Alter ein:")
    user_data['address'] = get_user_input("Bitte geben Sie Ihre Adresse ein:")
    user_data['insurance_type'] = get_user_input("Welche Versicherungsart möchten Sie (z.B. Haftpflicht, Hausrat)?")
    user_data['coverage_amount'] = get_user_input("Welche Deckungssumme wünschen Sie?")

    # Erstelle eine JSON-Datei aus den gesammelten Daten
    import json
    json_data = json.dumps(user_data, indent=4)

    # Sende die JSON-Daten an das Backend
    import requests
    response = requests.post("http://your-backend-url/calculate", json=json_data)

    # Zeige die Antwort vom Backend an
    print("Antwort vom Backend:", response.json())

if __name__ == "__main__":
    main()
