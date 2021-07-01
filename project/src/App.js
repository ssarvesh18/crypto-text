
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import {Homepage} from './components/home';
import {Login} from './components/login';
import {Register} from './components/register';
import {Dashboard} from './components/dashboard';
import {Editgroup} from './components/editGroup';
import {MessageBox} from './components/messageBox';
import {PageNotfound} from './components/pageNotfound';


function App(props) {
 
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component = {Homepage}/>
        <Route exact path="/login" component= {Login}/> 
        <Route exact path="/register" component= {Register}/> 
        <Route exact path="/dashboard" component= {Dashboard}/> 
        <Route exact path="/group/edit" component={Editgroup} />
        <Route exact path="/group/message" component={ MessageBox} />
        <Route  component={ PageNotfound} />
        {/* <Cryptography/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
