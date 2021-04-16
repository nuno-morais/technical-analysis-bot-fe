import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Create, Datagrid, Error, LinearProgress, List, SimpleForm, TextField, TextInput, useDataProvider } from 'react-admin';

const useStyles = makeStyles({
    formbox: {
        padding: '0 8px'
    },
    maxwidth: {
        width: '100%'
    }
});

const PortfolioTrades = ({ id, record, resource }) => {
    const dataProvider = useDataProvider();
    const [trades, setTrades] = useState();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState();
    const classes = useStyles();

    useEffect(() => {
        if (refresh) {
            setRefresh(false);
            dataProvider.getList(`${resource}/${record.id}/trades`, {
                sort: { field: 'opened_at', order: 'DESC' },
                pagination: {
                    page: 1, 
                    perPage: 5
                }
            })
            .then(({ data }) => {
                setTrades(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
        }
    }, [dataProvider, resource, record.id, refresh]);

    if (loading) return <LinearProgress />
    if (error) return <Error title={'An error occurred on get trades'}/>;


    return (
        <div style={{ width: '100%' }}>
            <Box display="flex" flexWrap="wrap" p={1}>
                <Box p={1} className={classes.formbox}>
                    <Typography variant="h4" gutterBottom>Trades</Typography>
                </Box>
            </Box>
            {(trades == null || trades.length === 0) &&
                <Box display="flex" flexWrap="wrap" p={1}>
                    <Alert severity="warning" className={classes.maxwidth}>
                        There aren't any trade for this portfolio.
                    </Alert>
                </Box>
            }
            {(trades != null && trades.length > 0) &&
                <TableContainer component={Paper}>
                    <TradesTable
                        record={record} 
                        setRefresh={setRefresh} 
                        setError={setError} 
                        trades={trades}
                        classes={classes} 
                        dataProvider={dataProvider} />
                </TableContainer>
            }
        </div>)
};


const TradesTable = ({ record, setRefresh, setError, trades, classes, dataProvider }) => {
    return (<Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Shares</TableCell>
                    <TableCell>Opened at</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Closed at</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {trades.map((row, index) => (
                    <TableRow key={`${index}-${row.opened_at}`}>
                        <TableCell component="th" scope="row">{row.shares}</TableCell>
                        <TableCell>{moment(row.opened_at).format("YYYY-MM-DD")}</TableCell>
                        <TableCell>{row.opened_price}</TableCell>
                        <TableCell>{row.closed_at && moment(row.closed_at).format("YYYY-MM-DD")}</TableCell>
                        <TableCell>{row.closed_price}</TableCell>
                        <TableCell>{row.closed_at && (row.closed_price - row.opened_price) * row.shares}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
    )
}

export const PortfolioList = props => {
    return (
        <List  title="Watchlist" {...props}>
            <Datagrid expand={<PortfolioTrades />}>
                <TextField label="Market" source="market" />
                <TextField label="Product" source="product" />
            </Datagrid>
        </List>
    );
}

export const PortfolioCreate = (props) => (
    <Create title="New watchlist" {...props}>
        <SimpleForm>
            <TextInput label="Market" source="market" defaultValue={'US'} />
            <TextInput label="Product" source="product" />
            <TextInput label="Currency" hidden={true} source="currency" defaultValue={'USD'} />
        </SimpleForm>
    </Create>
);
