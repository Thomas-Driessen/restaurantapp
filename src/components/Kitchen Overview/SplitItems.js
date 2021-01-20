import React from 'react';
import Grid from '@material-ui/core/Grid';
import KitchenProductList from './KitchenProductList';
import toDo from './Arrays/ToDo';
import progress from './Arrays/Progress';
import done from './Arrays/Done';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class SplitItems extends React.Component {

    constructor() {
        super();

        this.state = {
            toDoLength: [],
            progressLength: [],
            doneLength: [],
            toDoPressed: false,
            progressPressed: false,
            donePressed: false,
            alertMessage: "",
            open: false
        }
    }

    componentDidMount() {
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

    setItemToTrue(array, element, position, key) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].tableNumber === element.tableNumber && array[i].timeStamp === element.timeStamp) {
                array[i].state[position] = true;
            }
        }
        localStorage.setItem(key, JSON.stringify(array));
        this.forceUpdate();
    }

    itemReady = (element, position, listTitle) => {
        switch (listTitle) {
            case "To do":
                this.setItemToTrue(toDo, element, position, "toDo");
                break;
            case "Progress":
                this.setItemToTrue(progress, element, position, "progress");
                break;
            case "Done":
                this.setItemToTrue(done, element, position, "done");
                break;
            default:
                return null;
        }
        this.setState({alertMessage: "Product finished", open: true});
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

    
    pushToProgress = (product) => {
        for (let i = 0; i < toDo.length; i++) {
            if (toDo[i] === product) {
                for(let j = 0; j < product.state.length; j++){
                    product.state[j] = false;
                }
                progress.push(product);
                toDo.splice(i, 1);
                localStorage.setItem("toDo", JSON.stringify(toDo));
                localStorage.setItem("progress", JSON.stringify(progress));
                this.setState({alertMessage: "Product pushed to progress", open: true});
                break;
            }
        }
    }

    pushToDone = (product) => {
        for (let i = 0; i < progress.length; i++) {
            if (progress[i] === product) {
                done.push(product);
                progress.splice(i, 1);
                localStorage.setItem("progress", JSON.stringify(progress));
                localStorage.setItem("done", JSON.stringify(done));
                this.setState({alertMessage: "Product pushed to done", open: true});
                break;
            }
        }
    }

    pushToPickUp = (product) => {
        for (let i = 0; i < done.length; i++) {
            if (done[i] === product) {
                done.splice(i, 1);
                localStorage.setItem("done", JSON.stringify(done));
                this.setState({alertMessage: "Product ready to pick up", open: true});
                break;
            }
        }
    }

    handlerToDo = () => {
        this.setState({
            toDoPressed: !this.state.toDoPressed
        });
    }

    handlerProgress = () => {
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

        if (this.state.toDoPressed) {
            return (
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <KitchenProductList products={toDo} listTitle="To do" goToNext={this.pushToProgress} itemReady={this.itemReady} fullScreen={this.state.toDoPressed} click={this.handlerToDo} />
                </Grid>
            )
        }

        if (this.state.progressPressed) {
            return (
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <KitchenProductList products={progress} listTitle="Progress" goToNext={this.pushToDone} itemReady={this.itemReady} fullScreen={this.state.progressPressed} click={this.handlerProgress} />
                </Grid>
            )
        }

        if (this.state.donePressed) {
            return (
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <KitchenProductList products={done} listTitle="Done" goToNext={this.pushToPickUp} itemReady={this.itemReady} fullScreen={this.state.donePressed} click={this.handlerDone} />
                </Grid>
            )
        }

        return (
            <div>
            <Grid container spacing={0} style={{ padding: 5 }}>
                <KitchenProductList products={toDo} listTitle="To do" goToNext={this.pushToProgress} itemReady={this.itemReady} fullScreen={this.state.toDoPressed} click={this.handlerToDo} />
                <KitchenProductList products={progress} listTitle="Progress" goToNext={this.pushToDone} itemReady={this.itemReady} fullScreen={this.state.progressPressed} click={this.handlerProgress} />
                <KitchenProductList products={done} listTitle="Done" goToNext={this.pushToPickUp} itemReady={this.itemReady} fullScreen={this.state.donePressed} click={this.handlerDone} />
            </Grid>
            <Snackbar open={this.state.open} autoHideDuration={2000} onClose={()=>{this.setState({open:false})}}>
                <Alert variant="filled" severity="success">
                    {this.state.alertMessage}
                </Alert>
            </Snackbar>
            </div>
        )
    }
}
export default SplitItems