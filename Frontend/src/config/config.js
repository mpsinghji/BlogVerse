const isProduction = import.meta.env.PROD;
export const BACKEND_URL = isProduction 
  ? 'https://blogverse-3b1m.onrender.com'
  : 'http://localhost:5000';

console.log('Current Environment:', isProduction ? 'Production' : 'Development');
console.log('Backend URL:', BACKEND_URL); 