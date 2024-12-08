import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../authConfig';

export function GetPlaner() {
  const { instance, accounts } = useMsal();
  const [ tasks, setTasks] = React.useState([])

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const callPlannerApi = async () => {
    const account = accounts[0];
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    const accessToken = response.accessToken;
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append('Authorization', bearer);

    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch('https://graph.microsoft.com/v1.0/planner/plans/Vk-zZ4Fw9UibM1QjQeqSN30AA3T3/tasks', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTasks(data.value)
        })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={callPlannerApi}>Call Planner API</button>
      <br></br>
      {tasks.map(item => 
        <p>{item.title}</p>
      )}
    </div>
  );
}