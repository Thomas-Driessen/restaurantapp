import React from 'react';
import Grid from '@material-ui/core/Grid';
import KitchenProduct from './KitchenProduct';
import Typography from '@material-ui/core/Typography';

class ProductsList extends React.Component {

    render(){
    return(
        <Grid item xs={12} sm={6} lg={4} xl={4} style={{padding: 25}}>
            <Typography variant="h4">{this.props.listTitle}</Typography>
            <div className="background-lightgray kitchen-overview-container">
                { this.props.products.map((currentProduct, index) => (
                    <KitchenProduct key={index} product={currentProduct} goToNext={this.props.goToNext}/>
                ))}
            </div>
        </Grid>
    )}
}
export default ProductsList