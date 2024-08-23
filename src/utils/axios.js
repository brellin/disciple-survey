import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/disciple/'
    : 'https://server.willumstead.com/disciple/';

export default axios;
