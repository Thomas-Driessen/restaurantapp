import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';


class KitchenProduct extends React.Component {

    render() {
        return (
            <div>
                { this.props.product ? (
                    <div>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="inherit" component="h2">
                                    {this.props.product.title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <div style={{ display: 'flex', alignItems: 'right' }}>
                                        <IconButton aria-label="push" onClick={() => this.props.goToNext(this.props.product.title)}>
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </Grid>
                            </CardActions>
                        </Card>
                    </div>
                ) : null}
            </div>
        )
    }
}
export default KitchenProduct