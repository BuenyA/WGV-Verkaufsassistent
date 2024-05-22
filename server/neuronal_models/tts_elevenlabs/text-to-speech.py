import requests
import json

CHUNK_SIZE = 1024
XI_API_KEY = "fc877bad5856f9a45002b9d42458eda2"
VOICE_ID = "iP95p4xoKVk53GoZ742B"
TEXT_TO_SPEAK = "Bei uns bekommst du nämlich immer ein top Preis-Leistungs-Verhältnis und maßgeschneiderte Lösungen, die genau auf deine Bedürfnisse abgestimmt sind. Außerdem sind wir stolz auf unseren erstklassigen Kundenservice, der dir jederzeit mit Rat und Tat zur Seite steht."  # Text you want to convert to speech
OUTPUT_PATH = "C:/Users/aydem\Documents/Chatlyn_local/server/neuronal_network/tts_elevenlabs/output.mp3"

tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/stream"

headers = {
    "Accept": "application/json",
    "xi-api-key": XI_API_KEY
}

data = {
    "text": TEXT_TO_SPEAK,
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5,
        "style": 0.0,
        "use_speaker_boost": True
    }
}

response = requests.post(tts_url, headers=headers, json=data, stream=True)

if response.ok:
    with open(OUTPUT_PATH, "wb") as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            f.write(chunk)
    print("Audio stream saved successfully.")
else:
    print(response.text)

### Voice IDs ###

# Rachel; 21m00Tcm4TlvDq8ikWAM
# Drew; 29vD33N1CtxCmqQRPOHJ
# Clyde; 2EiwWnXFnvU5JabPnv8n
# Paul; 5Q0t7uMcjvnagumLfvZi
# Domi; AZnzlk1XvdvUeBnXmlld
# Dave; CYw3kZ02Hs0563khs1Fj
# Fin; D38z5RcWu1voky8WS1ja
# Sarah; EXAVITQu4vr4xnSDxMaL
# Antoni; ErXwobaYiN019PkySvjV
# Thomas; GBv7mTt0atIp3Br8iCZE
# Charlie; IKne3meq5aSn9XLyUdCD
# George; JBFqnCBsd6RMkjVDRZzb
# Emily; LcfcDJNUP1GQjkzn1xUU
# Elli; MF3mGyEYCl7XYWbV9V6O
# Callum; N2lVS1w4EtoT3dr4eOWO
# Patrick; ODq5zmih8GrVes37Dizd
# Harry; SOYHLrjzK2X1ezoPC6cr
# Liam; TX3LPaxmHKxFdv7VOQHJ
# Dorothy; ThT5KcBeYPX3keUQqHPh
# Josh; TxGEqnHWrfWFTfGW9XjX
# Arnold; VR6AewLTigWG4xSOukaG
# Charlotte; XB0fDUnXU5powFXDhCwa
# Alice; Xb7hH8MSUJpSbSDYk0k2
# Matilda; XrExE9yKIg1WjnnlVkGX
# James; ZQe5CZNOzWyzPSCn5a3c
# Joseph; Zlb1dXrM653N07WRdFW3
# Jeremy; bVMeCyTHy58xNoL34h3p
# Michael; flq6f7yk4E4fJM5XTYuZ
# Ethan; g5CIjZEefAph4nQFvHAz
# Chris; iP95p4xoKVk53GoZ742B
# Gigi; jBpfuIE2acCO8z3wKNLl
# Freya; jsCqWAovK2LkecY7zXl4
# Brian; nPczCjzI2devNBz1zQrb
# Grace; oWAxZDx7w5VEj9dCyTzz
# Daniel; onwK4e9ZLuTAKqWW03F9
# Lily; pFZP5JQG7iQjIQuC4Bku
# Serena; pMsXgVXv3BLzUgSXRplE
# Adam; pNInz6obpgDQGcFmaJgB
# Nicole; piTKgcLEGmPE4e6mEKli
# Bill; pqHfZKP75CvOlQylNhV4
# Jessie; t0jbNlBVZ17f02VDIeMI
# Sam; yoZ06aMxZJJ28mfd3POQ
# Glinda; z9fAnlkpzviPz146aGWa
# Giovanni; zcAOhNBS3c14rBihAFp1
# Mimi; zrHiDhphv9ZnVXBqCLjz