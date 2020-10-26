import React from 'react';
import Loading from '../components/LoadingComponent';

class CameraPage extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
    }

    componentDidMount() {
        console.log(this.props.match.params.tableNumber);
        sessionStorage.setItem("tableId", this.props.match.params.tableNumber);
        this.props.history.push("/");
    }

    render() {
        return(
            <div>
                <Loading />
            </div>
        )
    }
}
export default CameraPage
