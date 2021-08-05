
import axios from "axios";

const BASE_URL = 'https://localhost:5000z'

export function createNewHost(hostData) 
{
    axios.post(`${BASE_URL}`, hostData)
      .then((response) => {
        console.log(response.data, '!');
        
      }, (error) => {
        console.log(error);
      });
}