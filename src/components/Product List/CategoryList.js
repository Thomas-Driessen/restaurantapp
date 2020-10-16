import React from 'react';
import Grid from '@material-ui/core/Grid';
import Category from './Category';

const CategoryList = (props) => {
    return(
    <Grid container spacing={0} style={{padding: 15}}>
        { props.categories.map((currentCategory, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <Category key={index} category={currentCategory} selectCategory={props.selectCategory}/>
            </Grid>
        ))}
    </Grid>
    )
}
export default CategoryList