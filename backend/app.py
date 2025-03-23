from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import pytz
from use.sample import process_coding_prompt  # Import the processing function
import traceback  # Add this import for better error tracking

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Store prompts and their results in memory
prompts_history = []

def get_formatted_timestamp():
    # Get current time in UTC
    utc_now = datetime.now(pytz.UTC)
    # Convert to local time
    local_time = utc_now.astimezone()
    # Format the timestamp
    return local_time.strftime("%b %d, %Y %I:%M:%S %p")

@app.after_request
def add_header(response):
    # Add headers to both force latest IE rendering engine or Chrome Frame,
    # and also to cache the rendered page for 10 seconds.
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

# Add new API endpoint for React frontend
@app.route('/api/prompt', methods=['POST'])
def handle_api_prompt():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        prompt = data.get('prompt')
        language = data.get('language', 'python')
        
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400
            
        print(f"Processing prompt: '{prompt}' for language: {language}")
        
        # Find and update existing prompt entry
        existing_prompt = next(
            (p for p in prompts_history if p['prompt'] == prompt and p['status'] == 'pending'),
            None
        )
            
        try:
            # Process the prompt using the sample.py function with specified language
            algorithm_explanation, code_implementation = process_coding_prompt(prompt, language)
            
            if not algorithm_explanation or not code_implementation:
                return jsonify({'error': 'Failed to generate response'}), 500
                
        except Exception as process_error:
            print(f"Error processing prompt: {str(process_error)}")
            print(traceback.format_exc())
            return jsonify({'error': f'Failed to process prompt: {str(process_error)}'}), 500
        
        if existing_prompt:
            # Update existing entry
            existing_prompt.update({
                'algorithm': algorithm_explanation,
                'code': code_implementation,
                'status': 'completed'
            })
            prompt_entry = existing_prompt
        else:
            # Create new entry if not found
            prompt_entry = {
                'prompt': prompt,
                'timestamp': get_formatted_timestamp(),
                'id': len(prompts_history) + 1,
                'algorithm': algorithm_explanation,
                'code': code_implementation,
                'language': language,
                'status': 'completed'
            }
            prompts_history.append(prompt_entry)
        
        # Return the result
        return jsonify(prompt_entry)
        
    except Exception as e:
        print(f"Error in API prompt: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/', methods=['GET', 'POST'])
def handle_prompt():
    if request.method == 'POST':
        try:
            prompt = request.form.get('prompt')
            language = request.form.get('language', 'python')
            print(f"Received prompt: {prompt}, Language: {language}")
            
            if not prompt:
                return jsonify({'error': 'No prompt provided'}), 400
            
            # Store prompt immediately with pending status
            new_prompt = {
                'prompt': prompt,
                'timestamp': get_formatted_timestamp(),
                'id': len(prompts_history) + 1,
                'status': 'pending',
                'language': language
            }
            prompts_history.append(new_prompt)
            print(f"Added prompt to history: {new_prompt}")
            
            return jsonify({'status': 'success', 'message': 'Prompt received'})
            
        except Exception as e:
            print(f"Error handling prompt: {str(e)}")
            return jsonify({'error': str(e)}), 500
    
    return render_template('index.html', prompts=prompts_history)

@app.route('/sample', methods=['GET'])
def sample_prompt():
    try:
        # Sample coding prompt
        sample_query = "write a Python function to find the fibonacci sequence"
        
        # Process the sample prompt
        algorithm_explanation, code_implementation = process_coding_prompt(sample_query)
        
        # Store prompt with results
        prompts_history.append({
            'prompt': sample_query,
            'timestamp': get_formatted_timestamp(),
            'id': len(prompts_history) + 1,
            'algorithm': algorithm_explanation,
            'code': code_implementation
        })
        
        # Redirect to home page to see the results
        return render_template('index.html', prompts=prompts_history)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
