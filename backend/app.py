from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Store prompts in memory (you might want to use a database in production)
prompts_history = []

@app.route('/api/prompt', methods=['POST'])
def handle_prompt():
    try:
        data = request.json
        prompt = data.get('prompt')
        
        if not prompt:
            return jsonify({
                'error': 'No prompt provided'
            }), 400
            
        # Store prompt with timestamp
        prompts_history.append({
            'prompt': prompt,
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'id': len(prompts_history) + 1
        })
        
        response = {
            'message': f'Received prompt: {prompt}',
            'status': 'success'
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/')
def view_prompts():
    return render_template('index.html', prompts=prompts_history)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
