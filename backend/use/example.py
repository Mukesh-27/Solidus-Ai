import requests
import json

# API endpoint with query parameter
url = 'https://agentforge-api.aitech.io/automation/api/workflow'

# Query parameters
params = {
    'limit': 50
}

# Headers
headers = {
    'apikey': 'UqtckLuZItUTfS4UzpPcKTaMAtmSKfwa'  # Replace with your actual API key
}

try:
    # Make GET request
    response = requests.get(url, params=params, headers=headers)
    
    # Check if request was successful
    response.raise_for_status()
    
    # Print response in formatted JSON
    print(json.dumps(response.json(), indent=2))

except requests.exceptions.RequestException as e:
    print(f"Error occurred: {e}")