
 
 
 
 //const domain = 'http://127.0.0.1:5000'
 const domain = 'https://apiplanproj.herokuapp.com/'
 
 export const postLogin = async (url, params={}, objects={}, method='POST') => {
       
    let responsedata = []
    let options = {
          method,
          'Content-Type':'application/json;charset=utf-8'          
      };
    
    url += '?' + ( new URLSearchParams( params ) ).toString();
    options.body = JSON.stringify( objects );
      
    
    const response = await fetch(domain+url, options)
       
    if (response.ok) {
        responsedata = await response.json()     
            
    } else {
        console.log('erreur')
        responsedata = [{'error':'error'}]
    };
    
    return responsedata;
    
  }

  export const getRessources = async (url, params={}, objects={}, method='GET') => {
    const myHeaders = new Headers();
    myHeaders.append('HTTP_AUTHORIZATION',sessionStorage.getItem('token') ) 
    let responsedata = []
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
        console.log('erreur')
        responsedata = [{'error':'error'}]
        sessionStorage.isLogin = false
        alert('session expirée, veuillez vous logger à nouveau')
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
        console.log('erreur')
        responsedata = [{'error':'error'}];
        sessionStorage.isLogin = false
        alert('session expirée, veuillez vous logger à nouveau')
    };
    console.log(responsedata)
    return responsedata;
  }
