import requests

url = "http://localhost:3000/api/data"

data = {
    "name": "John Doe",
    "age": 30
}

response = requests.post(url, data=data)

if response.status_code == 200:
    print("The data was sent successfully")
else:
    print("There was an error sending the data")