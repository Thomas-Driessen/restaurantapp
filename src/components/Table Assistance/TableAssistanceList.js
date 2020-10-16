import React from 'react';
import Grid from '@material-ui/core/Grid';
import TableAssistance from './TableAssistance';

const TableAssistanceList = (props) => {
    return(
    <Grid container spacing={0} style={{padding: 15}}>
        { props.TableAssistance.map(currentTable => (
            <Grid key={currentTable.id} item xs={12} sm={6} lg={4} xl={3}>
                <TableAssistance key={currentTable.id} TableAssistance={currentTable} AssistanceType={props.AssistanceType}/>
            </Grid>
        ))}
    </Grid>
    )
}
export default TableAssistanceList