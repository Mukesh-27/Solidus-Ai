import requests
import json

# API endpoint
url = 'https://agentforge-api.aitech.io/automation/api/execution/67da5c125afa657593c9e0df/logs'

# Headers
headers = {
    'apikey': 'UqtckLuZItUTfS4UzpPcKTaMAtmSKfwa'  # Replace with your actual API key
}

try:
    # Make GET request
    response = requests.get(url, headers=headers)
    
    # Check if request was successful
    response.raise_for_status()
    
    # Print response in formatted JSON
    print(json.dumps(response.json(), indent=2))

except requests.exceptions.RequestException as e:
    print(f"Error occurred: {e}")