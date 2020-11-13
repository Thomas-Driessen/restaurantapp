import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CategoryEdit from './CategoryEdit';
import CategoryDelete from './CategoryDelete';

const Product = (props) => {
  return (
    <div>
      { props.category ? (
        <div>
          <Card >
            <CardMedia style={{ height: 400 }}
              component="img"
              height="250"
              src={props.category.image}
              alt={`Image for ${props.category.categoryName} Not Found`}
              title={props.category.categoryName}
            />
            <CardContent>
              <Typography gutterBottom variant="inherit" component="h2">
                {props.category.categoryName}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                direction="row"
              >
                <div style={{ display: "flex", alignItems: "right" }}>
                  <CategoryEdit
                    category={props.category}
                  />
                  <CategoryDelete
                    category={props.category}
                  />
                </div>
              </Grid>
            </CardActions>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
export default Product