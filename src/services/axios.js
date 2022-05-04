import axios from "axios";


const base_url = axios.create({ baseURL: 'http://localhost:3005' })

export default base_url
