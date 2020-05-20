import axios from 'axios';

export function fetchData(eventDate) {
    let data = {
      eDate : eventDate
    }
    return function(dispatch) {
      return axios.post("http://localhost:3010/getdata",data)
        .then(({ data }) => {
            console.log(data)
        dispatch(setData(data));
      });
    }
  }
 function setData(data){
     return{
         type:"get_data",
         payload:data
     }
 }

 