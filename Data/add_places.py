from bs4 import BeautifulSoup as bs
from urllib import request
import pandas as pd
import pandas as pd


print("Fetching Data of Different Airports...")

# Fetching top 1000 airports in the world
page_world = request.urlopen("https://gettocenter.com/airports/top-100-airports-in-world/1000")
soup_world = bs(page_world, features="html.parser")

# Fetching top airports in India
page_india = request.urlopen("https://gettocenter.com/airports/country/india")
soup_india = bs(page_india, features="html.parser")

column_names = ['city', 'airport', 'code', 'country']
df = pd.DataFrame(columns=column_names)

tr_world = soup_world.body.find_all('tr')

for r in tr_world:
    d = r.find_all('td')
    if len(d) >= 5:  # Check if there are enough columns in the row
        airport = d[1].text.strip()
        code = d[2].text.strip().upper()
        city = d[3].text.strip()
        country = d[4].text.strip()

        row = {
            'city': city,
            'airport': airport,
            'code': code,
            'country': country
        }
        df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)

# Extracting data from top airports in India
tr_india = soup_india.body.find_all('table')[0].find_all('tr')

for r in tr_india[1:]:
    d = r.find_all('td')
    if len(d) >= 4:  # Check if there are enough columns in the row
        airport = d[1].text.strip()
        code = d[2].text.strip().upper()
        city = d[3].text.strip()
        country = 'India'

        row = {
            'city': city,
            'airport': airport,
            'code': code,
            'country': country
        }
        
        df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)

print("Saving data in the file airports.csv")
df.to_csv("Data/airports.csv", index=False, columns=['city', 'airport', 'code', 'country'])


print("DONE")
