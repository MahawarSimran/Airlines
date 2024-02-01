import pandas as pd
import random
from faker import Faker

# Set up Faker to generate fake data
fake = Faker()

# Define the number of rows in your dataset
num_rows = 10000

count = [i for i in range(num_rows)]

# Create lists to store data
airplane_ids = ['Airbus A319', 'Airbus A320', 'Airbus A321', 'Airbus A332', 'Boeing 707', 'Boeing 727', 'Boeing 737', 'Boeing 747', 'Boeing 787', 'Embraer ERJ145', 'Embraer ERJ155', 'Embraer ERJ165', ]
airplane_ids_list = [random.choice(airplane_ids) for _ in range(num_rows)]

# Load CSV file into a DataFrame
file_path = 'airports.csv'  
df = pd.read_csv(file_path)
column_to_get_list = 'AirportID'  
airport_ids = df[column_to_get_list].tolist()

sources = [random.choice(airport_ids) for _ in range(num_rows)]
destinations = [random.choice(airport_ids) for _ in range(num_rows)]

departure_times = [fake.time(pattern='%H:%M') for _ in range(num_rows)]
arrival_times = [fake.time(pattern='%H:%M') for _ in range(num_rows)]

running_statuses = ['On Time', 'On Time', 'On Time', 'Delayed', 'Cancelled']
running_status = [random.choice(running_statuses) for _ in range(num_rows)]

stops = [0,0,0,1,1,2,3]
num_of_stops = [random.choice(stops) for _ in range(num_rows)]

fares = [round(random.uniform(5000, 50000)) for _ in range(num_rows)]

# Create a DataFrame
airline_data = pd.DataFrame({
    'Count' : count,
    'AirplaneID': airplane_ids_list,
    'Source': sources,
    'Destination': destinations,
    'DepartureTime': departure_times,
    'ArrivalTime': arrival_times,
    'RunningStatus': running_status,
    'NumOfStops': num_of_stops,
    'Fare': fares
})

# Save the DataFrame to a CSV file
airline_data.to_csv('airline_dataset.csv', index=False)
