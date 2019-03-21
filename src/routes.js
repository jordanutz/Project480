import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Giving from './components/Giving/Giving';
import Outreach from './components/Community/Outreach/Outreach';
import Calendar from './components/Connect/Calendar/Calendar';
import Homepage from './components/Homepage/Homepage';
import BibleStudy from './components/Community/BibleStudy/BibleStudy';
import Team from './components/Team/Team';
import Connect from './components/Connect/Connect';
import Fellowship from './components/Fellowship/Fellowship';
import Community from './components/Community/Community';



export default (

  <Switch>

    <Route exact path='/' component={Homepage}/>
    <Route path='/ourstory' component={Team} />
    <Route path='/fellowship' component={Fellowship} />
    <Route path='/community' component={Community} />
    <Route path='/outreach' component={Outreach} />
    <Route path='/giving' component={Giving} />
    <Route path='/connect' component={Connect} />
    <Route path='/smallgroups' component={BibleStudy} />



  </Switch>
)
