const axios = require('axios');

const data = {
  endpointId: "predefined-openai-gpt4o",
  query: "What is AI AgentForge?",
  pluginIds: ["plugin-1742363936"],
  responseMode: "sync"
};

const config = {
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'UqtckLuZItUTfS4UzpPcKTaMAtmSKfwa'
  }
};

axios.post('https://agentforge-api.aitech.io/chat/v1/sessions/67df903b7820b32d219800ab/query', data, config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
