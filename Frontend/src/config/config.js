const isProduction = import.meta.env.PROD;
export const BACKEND_URL = isProduction 
  ? 'https://blogverse-backend.onrender.com'
  : 'http://localhost:5000';

console.log('Current Environment:', isProduction ? 'Production' : 'Development');
console.log('Backend URL:', BACKEND_URL); 