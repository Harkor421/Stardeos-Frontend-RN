import client from './client'


const getStreams = (username) => {
    return client.get(`/streams/${username}`);
};


export default{
    getStreams,
}