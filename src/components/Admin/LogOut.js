import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

class Header extends React.Component {

    render(){
  return (
    <div>
      <AppBar position="static">
        <ToolBar>
          <Container disableGutters>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button  variant="text" size="large" color="inherit">
                  Log Out
                </Button>
            </div>
          </Container>
        </ToolBar>
      </AppBar>
    </div>
  )}
}
export default Header;