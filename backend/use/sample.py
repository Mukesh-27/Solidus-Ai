import requests
import json

# Request data for algorithm explanation
def get_algorithm_explanation(query):
    data = {
        "endpointId": "predefined-openai-gpt4o",
        "query": f"Explain just the algorithm to {query}, don't include any code. Provide a step-by-step explanation with an example.",
        "pluginIds": [],
        "responseMode": "sync"
    }
    return data

# Request data for code implementation
def get_code_implementation(query, language):
    # Adjust the prompt based on the programming language
    lang_specific_prompt = f"Write a {language} code implementation for: {query}. Provide only the code block."
    
    data = {
        "endpointId": "predefined-openai-gpt4o",
        "query": lang_specific_prompt,
        "pluginIds": [],
        "responseMode": "sync"
    }
    return data

# Headers configuration
headers = {
    'Content-Type': 'application/json',
    'apikey': 'UqtckLuZItUTfS4UzpPcKTaMAtmSKfwa'
}

# API endpoint URL
url = 'https://agentforge-api.aitech.io/chat/v1/sessions/67df903b7820b32d219800ab/query'

def make_api_request(data):
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        return response.json()['data']['answer']
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {e}")
        return None

def extract_code_block(answer, language):
    # Map of language identifiers
    lang_markers = {
        'python': 'python',
        'javascript': 'javascript',
        'java': 'java',
        'cpp': 'cpp'
    }
    
    marker = lang_markers.get(language.lower(), language.lower())
    marker_start = f"```{marker}"
    
    if marker_start in answer:
        code_start = answer.find(marker_start) + len(marker_start)
        code_end = answer.find("```", code_start)
        return answer[code_start:code_end].strip()
    return answer

def process_coding_prompt(prompt, language='python'):
    print(f"Processing prompt: '{prompt}' in {language}")
    algorithm_explanation = None
    code_implementation = None
    
    # Get algorithm explanation
    algorithm_response = make_api_request(get_algorithm_explanation(prompt))
    if algorithm_response:
        algorithm_explanation = algorithm_response
    
    # Get language-specific code implementation
    code_response = make_api_request(get_code_implementation(prompt, language))
    if code_response:
        code_implementation = extract_code_block(code_response, language)
    
    return algorithm_explanation, code_implementation

# Example usage
if __name__ == "__main__":
    coding_prompt = "find the factorial of a number"
    process_coding_prompt(coding_prompt) 