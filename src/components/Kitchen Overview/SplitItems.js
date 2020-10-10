import React from 'react';
import Grid from '@material-ui/core/Grid';
import KitchenProductList from './KitchenProductList'
import toDo from './ToDo'
import progress from './Progress'
import done from './Done'

class SplitItems extends React.Component {

    constructor(){
        super();

        this.state = {
            toDoLength: 0,
            progressLength: 0,
            doneLength: 0
        }
    }

    componentDidMount(){
        setInterval(() => {
            this.checkOrderListLength();
        }, 50);
    }

    checkOrderListLength(){
        if(toDo.length !== this.state.toDoLength){
            this.setState({toDoLength: toDo.length});
        }

        if(progress.length !== this.state.progressLength){
            this.setState({progressLength: progress.length});
        }

        if(done.length !== this.state.doneLength){
            this.setState({doneLength: done.length});
        }
    }

    pushToProgress(title){
        for(let i = 0; i < toDo.length; i++) {
            if(toDo[i].title === title) {
                progress.push(toDo[i]);
                toDo.splice(i, 1);
                break;
            }
        }
    }

    pushToDone(title){
        for(let i = 0; i < progress.length; i++) {
            if(progress[i].title === title) {
                done.push(progress[i]);
                progress.splice(i, 1);
                break;
            }
        }
    }

    pushToPickUp(title){
        for(let i = 0; i < done.length; i++) {
            if(done[i].title === title) {
                done.splice(i, 1);
                break;
            }
        }
    }

    render(){
        return(
                <Grid container spacing={0} style={{padding: 5}}>
                    <KitchenProductList products={toDo} listTitle="To do" goToNext={this.pushToProgress}/>
                    <KitchenProductList products={progress} listTitle="Progress" goToNext={this.pushToDone}/>
                    <KitchenProductList products={done} listTitle="Done" goToNext={this.pushToPickUp}/>
                </Grid>
        )}
}
export default SplitItems