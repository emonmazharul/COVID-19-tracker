import React, { useState,useContext } from 'react';
import {
  Segment, Sidebar, Button,Icon,Image,Container,Responsive,Menu,Dropdown
} from 'semantic-ui-react';
import AddSale from '../addsalecomponent/addsale';
import image from '../../img/user.png';
import { Datacontext } from '../context/context'
import { Link } from 'react-router-dom';


function DashboardMenu({ settingViewer, saleViewer, active }) {
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <Sidebar
        as={Segment}
        inverted
        animation="overlay"
        onHide={() => setVisible(false)}
        visible={visible}
        direction="right"
        width="wide"
      >
        <AddSale />
      </Sidebar>
      <Sidebar.Pusher dimmed={visible}>
        <Dropdown pointing="top right">
          <Dropdown.Menu>
            <Dropdown.Item onClick={saleViewer} disabled={!active}>
              Sales
            </Dropdown.Item>
            <Dropdown.Item style={{ display: active ? 'none' : '' }} onClick={() => setVisible(true)}>
              Add sale
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={settingViewer} disabled={active}>
              Setting
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Sidebar.Pusher>
    </React.Fragment>
  );
}

function Nav({ settingViewer, saleViewer, active }){
  const {avatar} = useContext(Datacontext).userData;
  const [sidebarOpened,changeState] = useState(false);
  function toggle(){
    changeState(true);
  }
  function close() {
    changeState(false);
  }

  return (
    <React.Fragment>
    <Sidebar
          as={Menu}
          inverted
          pointing
          stackable
          animation="push"
          onHide={close}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to="/" active>Home</Menu.Item>
          <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
          <Menu.Item >
            <Button as={Link} to="/register" content="Register" />
          </Menu.Item>
        </Sidebar>
      <Sidebar.Pusher dimmed={sidebarOpened}>
      <Responsive style={{marginBottom:'1em'}} as={Segment} vertical inverted minWidth={700}>
        <Container>
        <Menu inverted pointing borderless>
          <Menu.Item as={Link} to="/">Home</Menu.Item>
          <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
          <Menu.Item position="right">
            <Image src={ avatar ? `data:${avatar.mimeType};base64,${avatar.avatar}` : image} size="mini" avatar/>
            <DashboardMenu 
              settingViewer={settingViewer}
              saleViewer={saleViewer} 
              active={active}
            />
          </Menu.Item>
        </Menu>
        </Container>
      </Responsive>
      <Responsive style={{marginBottom:'1em'}} as={Segment} vertical inverted maxWidth={700}>
        <Container>
          <Menu inverted>
            <Menu.Item onClick={toggle}><Icon name="sidebar" /></Menu.Item>
            <Menu.Item position="right">
              <Image src={avatar ? `data:${avatar.mimeType};base64,${avatar.avatar}` : image} size="mini" avatar circular/>
              <DashboardMenu 
                settingViewer={settingViewer} 
                saleViewer={saleViewer} 
                active={active}/>
            </Menu.Item>
          </Menu>
        </Container>
      </Responsive>
      </Sidebar.Pusher>
    </React.Fragment>
  );
}

export default Nav;
