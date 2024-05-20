class UniqueInt:
    
    def __init__(self):
        self.seen_integers = [False] * 2048 

    def processFile(self, inputFilePath, outputFilePath):
        with open(inputFilePath, 'r') as inputFile:
            for line in inputFile:
                integer = self.readNextItemFromFile(line)
                if integer is not None:
                    self.mark_integer_seen(integer)
        
        with open(outputFilePath, 'w') as outputFile:
            sorted_unique_integers = sorted(self.generate_sorted_unique_integers())
            for integer in sorted_unique_integers:
                outputFile.write(f"{integer}\n")
            outputFile.write(f"{sorted_unique_integers[-1]}")

    def readNextItemFromFile(self, line):
        line = line.strip()
        if line == "" or len(line.split()) != 1:
            return None
        try:
            return int(line)
        except ValueError:
            return None

    def mark_integer_seen(self, integer):
        index = integer + 1023
        try:
            self.seen_integers[index] = True
        except:
            return

    def generate_sorted_unique_integers(self):
        for i in range(2048):
            if self.seen_integers[i]:
                yield i - 1023 
