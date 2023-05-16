import axios from 'axios';
const base_url = 'http://localhost:3010'

export async function fetchMessagesEnv(token) {
    try {
        let bodyData = {
            user: token
        }
        const response = await axios.post(`${base_url}/query/fetch-env`, bodyData);
        console.log(response)
        let messages = response.data.data
        return messages
    } catch (error) {
        return [];
    }
}
export async function fetchMessages(token) {
    try {
        let bodyData = {
            user: token
        }
        const response = await axios.post(`${base_url}/query/fetch`, bodyData);
        let messages = []
        response.data.data.map((message) => {
            if (message.query_text) {
                messages.push({ message: message.query_text, isUser: true });
            }
            if (message.answer_text) {
                messages.push({ message: message.answer_text, isUser: false });
            }
        });
        return messages
    } catch (error) {
        return [];
    }
}
export async function sendQuery(query, token) {
    try {
        let bodyData = {
            user: token,
            text: query
        }
        const response = await axios.post(`${base_url}/query`, bodyData, );
        let message = {
            message: response.data.data.answer_text,
            isUser: false
        }
        return message
    } catch (error) {
        return [];
    }
}
export async function fetchUserToken() {
    try {
        const response = await axios.get(`${base_url}/user-token`);
        return response.data.data
    } catch (error) {
        return [];
    }
}

