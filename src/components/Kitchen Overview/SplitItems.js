import React from 'react';
import Grid from '@material-ui/core/Grid';
import KitchenProductList from './KitchenProductList'
import toDo from './Arrays/ToDo'
import progress from './Arrays/Progress'
import done from './Arrays/Done'

class SplitItems extends React.Component {

    constructor() {
        super();

        this.state = {
            toDoLength: 0,
            progressLength: 0,
            doneLength: 0,
            toDoPressed: false,
            progressPressed: false,
            donePressed: false
        }
    }

    componentDidMount() {
        console.log(toDo);
        setInterval(() => {
            this.checkOrderListLength();
        }, 50);
        let mounted = true;

        if (mounted) {
            let items = localStorage.getItem("progress") ? JSON.parse(localStorage.getItem("progress") || []) : [];
            items.map(item => {
                progress.push(item);
                return true;
            })

            items = localStorage.getItem("done") ? JSON.parse(localStorage.getItem("done") || []) : [];
            items.map(item => {
                done.push(item);
                return true;
            })
        }

        return () => mounted = false;
    }

    checkOrderListLength() {
        if (toDo.length !== this.state.toDoLength) {
            this.setState({ toDoLength: toDo.length });
        }

        if (progress.length !== this.state.progressLength) {
            this.setState({ progressLength: progress.length });
        }

        if (done.length !== this.state.doneLength) {
            this.setState({ doneLength: done.length });
        }
    }

    pushToProgress(title) {
        for (let i = 0; i < toDo.length; i++) {
            if (toDo[i].title === title) {
                progress.push(toDo[i]);
                toDo.splice(i, 1);
                localStorage.setItem("toDo", JSON.stringify(toDo));
                localStorage.setItem("progress", JSON.stringify(progress));
                break;
            }
        }
    }

    pushToDone(title) {
        for (let i = 0; i < progress.length; i++) {
            if (progress[i].title === title) {
                done.push(progress[i]);
                progress.splice(i, 1);
                localStorage.setItem("progress", JSON.stringify(progress));
                localStorage.setItem("done", JSON.stringify(done));
                break;
            }
        }
    }

    pushToPickUp(title) {
        for (let i = 0; i < done.length; i++) {
            if (done[i].title === title) {
                done.splice(i, 1);
                localStorage.setItem("done", JSON.stringify(done));
                break;
            }
        }
    }

    handlerToDo = () => {
        this.setState({
            toDoPressed: !this.state.toDoPressed
        });
      }

      handlerProgress= () => {
        this.setState({
            progressPressed: !this.state.progressPressed
        });
      }

      handlerDone = () => {
        this.setState({
            donePressed: !this.state.donePressed
        });
      }


    render() {
        if(this.state.toDoPressed){
            return (
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <KitchenProductList products={toDo} listTitle="To do" goToNext={this.pushToProgress} fullScreen = {this.state.toDoPressed} click={this.handlerToDo}/>
                </Grid>
            )
        }

        if(this.state.progressPressed){
            return (
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <KitchenProductList products={progress} listTitle="Progress" goToNext={this.pushToDone} fullScreen = {this.state.progressPressed} click={this.handlerProgress}/>
                </Grid>
            )
        }

        if(this.state.donePressed){
            return (
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <KitchenProductList products={done} listTitle="Done" goToNext={this.pushToPickUp} fullScreen = {this.state.donePressed} click={this.handlerDone}/>
                </Grid>
            )
        }

        return (
            <Grid container spacing={0} style={{ padding: 5 }}>
                <KitchenProductList products={toDo} listTitle="To do" goToNext={this.pushToProgress} fullScreen = {this.state.toDoPressed} click={this.handlerToDo}/>
                <KitchenProductList products={progress} listTitle="Progress" goToNext={this.pushToDone} fullScreen = {this.state.progressPressed} click={this.handlerProgress}/>
                <KitchenProductList products={done} listTitle="Done" goToNext={this.pushToPickUp} fullScreen = {this.state.donePressed} click={this.handlerDone}/>
            </Grid>
        )
    }
}
export default SplitItems