const fs = require('fs');
const path = require('path');

class UniqueInt {
    constructor() {
        this.seen = new Array(2047).fill(false);
        this.minInt = -1023;
    }

    processFile(inputFilePath, outputFilePath) {
        this.seen.fill(false); // Reset seen array for each file
        const uniqueNumbers = this.readUniqueIntegers(inputFilePath);
        this.writeUniqueIntegers(uniqueNumbers, outputFilePath);
    }

    readUniqueIntegers(inputFilePath) {
        const uniqueNumbers = [];
        try {
            const lines = fs.readFileSync(inputFilePath, 'utf-8').split('\n');
            for (const line of lines) {
                const strippedLine = line.trim();
                if (strippedLine !== '' && this.isValidIntegerLine(strippedLine)) {
                    const number = parseInt(strippedLine);
                    if (-1023 <= number && number <= 1023) {
                        if (!this.seen[number - this.minInt]) {
                            this.seen[number - this.minInt] = true;
                            uniqueNumbers.push(number);
                        }
                    } else {
                        console.error(`Number out of range: ${number}`);
                    }
                }
            }
            uniqueNumbers.sort((a, b) => a - b);
        } catch (error) {
            console.error(`Error reading file: ${inputFilePath}`, error);
        }
        return uniqueNumbers;
    }

    isValidIntegerLine(line) {
        return /^\d+$/.test(line);
    }

    writeUniqueIntegers(uniqueNumbers, outputFilePath) {
        try {
            const outputFile = fs.createWriteStream(outputFilePath);
            for (const number of uniqueNumbers) {
                outputFile.write(`${number}\n`);
            }
            outputFile.close();
        } catch (error) {
            console.error(`Error writing to file: ${outputFilePath}`, error);
        }
    }
}

const uniqueIntProcessor = new UniqueInt();
const inputFolder = "/root/UniqueInt/Inputs";
const outputFolder = "/root/UniqueInt/Output";

fs.readdirSync(inputFolder).forEach(fileName => {
    if (path.extname(fileName) === '.txt') {
        const inputPath = path.join(inputFolder, fileName);
        const outputPath = path.join(outputFolder, `${path.parse(fileName).name}_results.txt`);

        // Timing for each file
        const startTime = Date.now();
        uniqueIntProcessor.processFile(inputPath, outputPath);
        const endTime = Date.now();
        const elapsedTime = (endTime - startTime) / 1000;
        console.log(`Processed ${inputPath} in ${elapsedTime} seconds`);
    }
});
