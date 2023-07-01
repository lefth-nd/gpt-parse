import os
import sys
import random

folder = "json"
try:
    files = (os.listdir(folder))
except:
    os.mkdir("json")
    files = (os.listdir(folder))

limit = 400000

if ("-c" in sys.argv):
    chunk = True
else:
    chunk = False

try:
    os.mkdir("merged")
except:
    print("dir already exists")

def getNewName():
    num1 = random.randint(499, 8989)
    num2 = random.randint(499, 8989)
    name = "merged/merged_"+str(num1)+"_"+str(num2)+".txt"
    return name

filename = "merged/merged.txt"
print("Chunking? "+chunk)
for i in files:
    try:
        fileSize = os.path.getsize(filename)
    except:
        fileSize = 0
    if (fileSize > limit and chunk):
        filename = getNewName()
    nFile = open(filename, "a")
    f = open(folder+"/"+i, "r", encoding="utf-8")
    lines = f.readlines()
    try:
        nFile.writelines(lines)
    except:
        print("Ignoring incompatible char...")
