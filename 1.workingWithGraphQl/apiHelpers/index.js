const axios = require('axios')

const getById = (model,id)=>{
    return axios.get(`http://localhost:3000/${model}/${id}`);
     
}
const getNestedById = (model,id,secondModel)=>{
    return axios.get(`http://localhost:3000/${model}/${id}/${secondModel}`);
}
const getAll = (model)=>{
    return axios.get(`http://localhost:3000/${model}`);
}
const post = (model,params)=>{
    return axios.post(`http://localhost:3000/${model}`,{
        ...params 
    });
}
const deleteModel = (model,id)=>{
    return axios.delete(`http://localhost:3000/${model}/${id}`);
}

module.exports = {
    getAll,
    getById,
    getNestedById,
    post,
    deleteModel
}