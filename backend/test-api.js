import axios from 'axios';
axios.get('http://localhost:3000/api/v1/fetchSuccessOrder', { withCredentials: true }).then(console.log).catch(e => console.error(e.message));
