import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream } from "fs";

import { v4 as uuid } from "uuid";

import * as dotenv from "dotenv";

dotenv.config();

const ELEVENLABS_API_KEY = "iP95p4xoKVk53GoZ742B";

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

const createAudioFileFromText = async (
  text: string
): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: "Rachel",
        model_id: "eleven_turbo_v2",
        text,
      });
      const fileName = `${uuid()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

console.log(createAudioFileFromText);