import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Datagrid, FunctionField, List, NumberField } from 'react-admin';

const useStyles = makeStyles({
    formbox: {
        padding: '0 8px'
    },
    maxwidth: {
        width: '100%'
    }
});

const TradesTable = ({ record, trades, classes, opened = false }) => {
    return (<Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Provider</TableCell>
                    <TableCell>Market</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Shares</TableCell>
                    <TableCell>Invested</TableCell>
                    <TableCell>Profit</TableCell>
                    <TableCell>%</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {trades.map((row, index) => (
                    <TableRow key={`${index}-${row.opened_at}`}>
                        <TableCell component="th" scope="row">{row.provider}</TableCell>
                        <TableCell>{row.market}</TableCell>
                        <TableCell>{row.product}</TableCell>
                        <TableCell>{parseFloat(row.shares).toFixed(2)}</TableCell>
                        <TableCell>{parseFloat(row.invested).toFixed(2)}</TableCell>
                        {!opened ? <TableCell>{parseFloat(row.total).toFixed(2)}</TableCell> : <TableCell>-</TableCell>}
                        {!opened ? <TableCell>{parseFloat((row.total/row.invested)*100).toFixed(2)}%</TableCell>: <TableCell>-</TableCell>}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
    )
}

export const TradesSummaryInfo = ({ id, record, resource }) => {
    const [trades, setTrades] = useState();
    const [filter, setFilter] = useState('market');
    const classes = useStyles();

    useEffect(() => {
        const trades = [];
        if (filter === 'market') {
            const tradesByMarket = record.trades.reduce((acc, value) => {
                const key = `${value.market}#${value.provider || 'NA'}`;
                acc[key] = acc[key] || { total: 0, shares: 0, market: value.market, product: '', invested: 0, provider: value.provider || 'NA' };
                acc[key].total += ((value.closed_price || 0) - value.opened_price) * value.shares;
                acc[key].shares += value.shares;
                acc[key].invested += value.opened_price * value.shares;
        
                return acc;
            }, {});
            for (const trade in tradesByMarket) {
                trades.push(tradesByMarket[trade]);
            }
        } else {
            const tradesByMarketProduct = record.trades.reduce((acc, value) => {
                const key = `${value.market}#${value.product}#${value.provider || 'NA'}`;
                acc[key] = acc[key] || { total: 0, shares: 0, market: value.market, product: value.product, invested: 0, provider: value.provider || 'NA' };
                acc[key].total += ((value.closed_price || 0) - value.opened_price) * value.shares;
                acc[key].shares += value.shares;
                acc[key].invested += value.opened_price * value.shares;

                return acc;
            }, {});
            for (const trade in tradesByMarketProduct) {
                trades.push(tradesByMarketProduct[trade]);
            }
        }
        trades.sort((a, b) => b.total - a.total)
        setTrades(trades);
    }, [filter, record]);

    return (
        <div style={{ width: '100%' }}>
            <Box display="flex" flexWrap="wrap" p={1}>
                <Box p={1} className={classes.formbox}>
                    <Typography variant="h4" gutterBottom>Trades</Typography>
                </Box>
                <Box p={1} className={classes.formbox}>
                    {filter === 'market' ? <Button
                        type="button"
                        fullWidth={false}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => (setFilter('product'))}
                    >
                        By Product
                    </Button> : <Button
                        type="button"
                        fullWidth={false}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => (setFilter('market'))}
                    >
                        By Market
                    </Button>}
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
                        trades={trades}
                        classes={classes}
                        opened={record.year == null} />
                </TableContainer>
            }
        </div>)
}

export const TradesSummaryList = props => {
    return (
        <List title="Summary" {...props}>
            <Datagrid expand={<TradesSummaryInfo />}>
                <FunctionField label="Closed at" render={record => `${record.year || "Not closed"}`} />
                <FunctionField label="# Trades" render={record => `${record.trades.length}`} />
                <NumberField label="Total" source="total"/>
            </Datagrid>
        </List>
    );
}
