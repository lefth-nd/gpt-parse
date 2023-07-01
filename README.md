# GPT Parse

## Export/Parse and Classify your ChatGPT Conversations

`npm install && npm install -g typescript`

export your chatGPT conversions and put the conversations.json in the root directory.

`node run.js`

this will put a bunch of text files in the json folder (of all the GPT conversations)

`python merger.py -c`

this will merge all into one text file. use without -c to skip chunk and just have a single large merged text file.

to classify with google cloud NLP put your .json credentials for the API in the root directory and run (make sure you rename your credential file to credentials.json)

`node demo/classify.js`

### Example output from classify using google API

![example](https://github.com/lefth-nd/gpt-parse/assets/74050386/761aa344-8c21-4a8c-95ba-550faa39ce96)

### Analyse Entities

`node demo/analyse.js`

this will output a list of wikipedia articles based on chat content

### Notes

---

if you've been talking about exploits with gpt and are on windows, windows defender might ask to send the files to inspect once the text files are written to the json folder.

this whole thing could have been written in python but I've been exploring typescript atm. maybe it'll transform into a web app later.

use ; instead of && if on windows.

merging chops the conversations into 400000 byte chunks to be within the limit for google's api.

must have Google Cloud Natural Language API enabled and the key pair for your service worker in a .json file for classify.ts to work.

use arguments to specify filetype:

`node run.js -md`

-md markdown : -txt text : -json json
