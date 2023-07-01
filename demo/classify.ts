import { LanguageServiceClient } from "@google-cloud/language";
import getFiles from "../main";
import * as fs from "fs";

const folder = "merged";

async function classifyDocument(content: string) {
  const client = new LanguageServiceClient({
    keyFilename: "credentials.json",
  });

  try {
    const [classification] = await client.classifyText({
      document: {
        content,
        type: "PLAIN_TEXT",
      },
    });

    const categories = classification.categories || [];

    console.log("Document Categories:");
    categories.forEach((category, index) => {
      console.log(`Category ${index + 1}: ${category.name}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

const files = getFiles(folder);

for (let i = 0; i < files.length; i++) {
  const filePath = files[i];
  const documentContent = fs.readFileSync(`${folder}/` + filePath, "utf-8");
  try {
    classifyDocument(documentContent);
  } catch (error) {
    console.log("too small");
  }
}
