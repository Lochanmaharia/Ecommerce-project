import { toast } from 'react-toastify';
import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

export {
    notify, client
}


