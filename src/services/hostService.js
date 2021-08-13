
import axios from "axios";

const BASE_URL = 'http://localhost:5000/hosts'

export function createNewHost(hostData) 
{
    var host_id = "";

    axios.post(`${BASE_URL}`, hostData)
      .then((response) => {
        console.log(response.data, '!');
        host_id = response.data["host_id"];
        
      }, (error) => {
        console.log(error);
      });
    
    return host_id;
}