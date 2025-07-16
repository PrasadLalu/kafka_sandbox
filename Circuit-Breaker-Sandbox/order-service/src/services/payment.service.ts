import axios from 'axios';
import { createCircuitBreaker } from '../utils/circuitBreaker';

const callPaymentAPI = async (payload: any) => {
    const URL = 'http://localhost:9000/api/v1/make-payment';
    const response = await axios.post(URL, payload);
    return response.data;
}

const breaker = createCircuitBreaker(callPaymentAPI);

export const processPayment = async(payload: any) => {
    return await breaker.fire(payload);
}
