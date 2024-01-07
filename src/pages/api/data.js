// src/pages/api/data.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://skyline.github.com/t31k/2024.json', {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });

    if (response.headers['content-type'].includes('application/json')) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json({ message: 'The server did not return a JSON response' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
