import React from 'react';
import Loading from '../components/LoadingComponent';
import { withRouter } from "react-router";

class CameraPage extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
    }

    componentDidMount() {
        document.title = this.props.name
        sessionStorage.setItem("tableId", this.props.match.params.tableNumber);
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Loading />
            </div>
        )
    }
}
export default withRouter(CameraPage)
