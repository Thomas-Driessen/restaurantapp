import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';

class KitchenProduct extends React.Component {

    render() {
        return (
            <div>
                { this.props.product ? (
                    <div>
                        <Grid style={{ paddingLeft: 10, padidngRight: 10 }}>
                            <div style={{ display: 'flex' }}>
                                <Typography gutterBottom variant="h6">
                                    {this.props.product}
                                </Typography>
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <div style={{ alignItems: 'right' }}>
                                        {!this.props.enabled ? (
                                            <IconButton aria-label="push" onClick={() => this.props.itemReady(this.props.element, this.props.position, this.props.listTitle)}>
                                                <AddIcon />
                                            </IconButton>
                                        ) : <CheckIcon style={{ color: "green" }} />}
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                ) : null}
            </div>
        )
    }
}
export default KitchenProduct