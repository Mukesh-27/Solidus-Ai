import requests
import json

# Request data
data = {
    "endpointId": "predefined-openai-gpt4o",
    "query": "What is ?",
    "pluginIds": [],
    "responseMode": "sync"
}

# Headers configuration
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer UqtckLuZItUTfS4UzpPcKTaMAtmSKfwa'  # Replace with your actual API key
}

# API endpoint
url = 'https://agentforge-api.aitech.io/chat/v1/query'  # Simplified URL without session ID

try:
    # Make the POST request
    response = requests.post(url, json=data, headers=headers)
    
    # Check if the request was successful
    response.raise_for_status()
    
    # Print the response data
    print(json.dumps(response.json(), indent=2))

except requests.exceptions.RequestException as e:
    if hasattr(e.response, 'status_code'):
        if e.response.status_code == 401:
            print("Error: Authentication failed. Please check your API key.")
        elif e.response.status_code == 404:
            print("Error: API endpoint not found. Please verify the URL.")
        else:
            print(f"Error: Server returned status code {e.response.status_code}")
            print(f"Response: {e.response.text}")
    else:
        print(f"Error: {str(e)}")