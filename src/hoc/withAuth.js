import  useAuth  from './../customHooks/useAuth'; 

//this is name import which is included inside the braces, whereas 
//if its a default import it has to be directly with the specific name

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;