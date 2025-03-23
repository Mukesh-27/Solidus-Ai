import requests
import json

# Request data
data = {
    "endpointId": "predefined-openai-gpt4o",
    "query": "Write a python code to find the sum of two numbers without using the + operator?",
    "pluginIds": [],
    "responseMode": "sync"
}

# Headers configuration
headers = {
    'Content-Type': 'application/json',
    'apikey': 'UqtckLuZItUTfS4UzpPcKTaMAtmSKfwa'
}

# API endpoint URL
url = 'https://agentforge-api.aitech.io/chat/v1/sessions/67df903b7820b32d219800ab/query'

try:
    # Make the POST request
    response = requests.post(url, json=data, headers=headers)
    
    # Check if request was successful
    response.raise_for_status()
    
    # Print the response data in a formatted way
    print(json.dumps(response.json(), indent=2))

except requests.exceptions.RequestException as e:
    # Handle any errors that occur
    print(f"Error occurred: {e}") 