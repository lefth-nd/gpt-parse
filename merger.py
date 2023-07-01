import os
import sys
import random

folder = "output"

limit = 9000

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

dest_filename = "merged/merged.txt"
print("Chunking? ",chunk)
tree = os.walk(folder)
for f in tree:
    print(f[0])
    try:
        subfolder_name = f[0].split("\\")[1]
    except:
        print("no subfolder")
    for filename in f[2]:
        if ("assistant" in filename or "user" in filename):
            try:
                fileSize = os.path.getsize(dest_filename)
            except:
                fileSize = 0
            if (fileSize > limit and chunk):
                dest_filename = getNewName()
            nFile = open(dest_filename, "a")
            print("opening")
            print(folder+"/"+subfolder_name+"/"+filename)
            f = open(folder+"/"+subfolder_name+"/"+filename, "r", encoding="utf-8")
            lines = f.readlines()
            try:
                nFile.writelines(lines)
            except:
                print("Ignoring incompatible char...")
