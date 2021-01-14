import React ,{Fragment} from 'react';

const Dashboard=({setAuth})=>{
    return(
<Fragment>
    <h1>Dasboard</h1>
    <button onClick={()=> setAuth(false)}>Logout</button>
    <button onclick = {console.log(true)}>Login</button>
</Fragment>
    );
};
export default Dashboard;