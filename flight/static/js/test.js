const fs = require('fs').promises;

async function getAirportCode(city) {
    try {
        // Replace 'your_csv_file_path.csv' with the actual path to your CSV file
        const csvData = await fs.readFile('./../../../Data/airports.csv', 'utf-8');

        // Convert the input city to lowercase for case-insensitive comparison
        const lowerCaseCity = city.trim().toLowerCase();

        // Split the CSV data into lines
        const lines = csvData.split('\n');

        // Iterate through each line (skip the header line)
        for (let i = 1; i < lines.length; i++) {
            const columns = lines[i].split(',');

            // Convert the city from the CSV file to lowercase for comparison
            const lowerCaseCityFromCSV = columns[0].trim().toLowerCase();

            // Check if the lowercase city in the current line matches the input lowercase city
            if (lowerCaseCityFromCSV === lowerCaseCity) {
                return columns[2].trim(); // Return the airport code
            }
        }

        // Return null if the city is not found
        return null;
    } catch (error) {
        console.error('Error reading CSV file:', error);
        return null;
    }
}

// Example usage:
const inputCity = 'delhi';
getAirportCode(inputCity)
    .then(airportCode => {
        if (airportCode !== null) {
            console.log(`The airport code for ${inputCity} is ${airportCode}`);
        } else {
            console.log(`Airport code not found for ${inputCity}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
