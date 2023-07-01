import { LanguageServiceClient } from "@google-cloud/language";
import getFiles from "../parser/main";
import * as fs from "fs";

const folder = "merged";

async function analyseEntities(content: string) {
  const client = new LanguageServiceClient({
    keyFilename: "credentials.json",
  });

  try {
    // Detects entities in the document
    const [result] = await client.analyzeEntities({
      document: {
        content,
        type: "PLAIN_TEXT",
      },
    });

    const entities = result.entities || [];

    console.log("Entities:");
    entities.forEach((entity) => {
      // only output the article if it exists
      //console.log(entity.name);
      //console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      if (entity.metadata && entity.metadata.wikipedia_url) {
        console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
const files = getFiles(folder);

for (let i = 0; i < files.length; i++) {
  const filePath = files[i];
  const documentContent = fs.readFileSync(`${folder}/` + filePath, "utf-8");
  try {
    analyseEntities(documentContent);
  } catch (error) {
    console.log("too small");
  }
}
