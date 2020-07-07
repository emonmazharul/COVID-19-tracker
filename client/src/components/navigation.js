import React from 'React';
import {
  Container, Icon, Responsive, Menu, Segment, Sidebar, Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(){
    super();
    this.state = {sidebarOpened:false};
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle(){
    this.setState({sidebarOpened:true})
  }
   
  close() {
    this.setState({sidebarOpened:false})
  }
  render() {
    const {sidebarOpened} = this.state;
    return (
      <React.Fragment>
      <Sidebar
        as={Menu}
        inverted
        pointing
        stackable
        animation="push"
        onHide={this.close}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item as={Link} to="/" active>Home</Menu.Item>
        <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
        <Menu.Item>
          <Button
            as={Link}
            to="/register"
            content="Register"
          />
        </Menu.Item>
        <Menu.Item>
          <Button
            color="teal"
            href="https://github.com/emonmazharul/"
            target="_blank"
            content="Author"
          />
        </Menu.Item>
      </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>
        <Responsive 
          style={{marginBottom:0}} 
          as={Segment} 
          vertical 
          inverted 
          minWidth={700}
        >
          <Container>
          <Menu inverted pointing borderless>
            <Menu.Item as={Link} to="/">Home</Menu.Item>
            <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
            <Menu.Item position="right">
              <Button
                as={Link}
                to="/register"
                content="Register"
              />
              <Button
                color="teal"
                style={{marginLeft:'0.5em'}}
                href="https://github.com/emonmazharul/"
                target="_blank"
                content="Author"
              />
            </Menu.Item>
          </Menu>
          </Container>
        </Responsive>
        <Responsive 
          style={{marginBottom:0}} 
          as={Segment} 
          vertical 
          inverted 
          maxWidth={699}
        >
          <Container>
            <Menu inverted>
              <Menu.Item onClick={this.toggle}><Icon name="sidebar" /></Menu.Item>
              <Menu.Item position="right">
                <Button
                  as={Link}
                  to="/register"
                  content="Register"
                />
                <Button
                  color="teal"
                  style={{marginLeft:'0.5em'}}
                  href="https://github.com/emonmazharul/"
                  target="_blank"
                  content="Author"
                />
              </Menu.Item>
            </Menu>
          </Container>
        </Responsive>
        </Sidebar.Pusher>
      </React.Fragment>
    );
  }
}

export default Navigation;
