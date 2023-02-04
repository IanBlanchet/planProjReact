

 const domain = process.env.REACT_APP_URI
 

 export const postLogin = async (url, params={}, objects={}, method='POST') => {
       
    let responsedata = []
    let options = {
          method,
          'Content-Type':'application/json;charset=utf-8'          
      };
    
    url += '?' + ( new URLSearchParams( params ) ).toString();
    options.body = JSON.stringify( objects );
      
    
    const response = await fetch(domain+url, options)
       
    
    responsedata = await response.json()
    
    
    return responsedata;
    
  }

  export const getRessources = async (url, params={}, objects={}, method='GET') => {
  

    let responsedata = []
    const myHeaders = new Headers();
    myHeaders.append('HTTP_AUTHORIZATION',sessionStorage.getItem('token') ) 
    let options = {
          method,
          'Content-Type':'application/json;charset=utf-8',
          headers: myHeaders,
          
      };
    
    url += '?' + ( new URLSearchParams( params ) ).toString();
    
    
    const response = await fetch(domain+url, options)
       
    if (response.ok) {
        responsedata = await response.json()     
            
    } else {
        
        responsedata = await response.json()
        if (response.status == 400)  {
            return responsedata
          
        }
                
    };
    
    return responsedata;
    
  }

  export const modJalon = async (url, params={}, objects={}, method='POST' ) => {
    const myHeaders = new Headers();
    myHeaders.append('HTTP_AUTHORIZATION',sessionStorage.getItem('token') ) 
    let responsedata = []
    let options = {
          method,
          'Content-Type':'application/json;charset=utf-8',
          headers: myHeaders,
          
      };
    
    url += '?' + ( new URLSearchParams( params ) ).toString();
    options.body = JSON.stringify( objects );
    
    const response = await fetch(domain+url, options)
       
    if (response.ok) {        
        responsedata = await response.json()
         
            
    } else {
      responsedata = await response.json()
      if (response.status == 400)  {
        //alert('session expirée, veuillez vous logger à nouveau');
        return responsedata
        
      }
          
        
    };
    
    return responsedata;
  }

  
  
