import React, { useEffect, useState } from 'react';
import { Create, Datagrid, DateField, DateInput, Edit, LinearProgress, List, NumberField, NumberInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useDataProvider } from 'react-admin';

export const Info = ({record: {shares, opened_price, closed_price}}) => {
    if (closed_price != null) {
        const value = shares * (closed_price - opened_price);
        return (<p>{value}</p>)
    }
    return (<p>Opened</p>);
}


const TradePrice = ({ record }) => {
    const dataProvider = useDataProvider();
    const [price, setPrice] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dataProvider.getList(`symbols`, {
            sort: { field: 'product', order: 'DESC' },
            filter: {
                products: `${record.product}`
            },
            pagination: {
                page: 1, 
                perPage: 1
            }
        })
        .then(({ data }) => {
            if (data.length > 0) {
                const price  = data[0].price;
                setPrice(`${price}`);
            } else {
                setPrice('NA');
            }
            setLoading(false);
        })
        .catch(error => {
            setPrice('NA');
            setLoading(false);
        })
    }, [dataProvider, record]);

    return (<p>{record.closed_price || (loading) ? <LinearProgress /> : price}</p>);
}

export const TradeList = props => {
    return (
        <List {...props}>
            <Datagrid  rowClick="show" > 
                <TextField label="Market" source="market" />
                <TextField label="Product" source="product" />
                <TextField label="Currency" source="currency" />

                <NumberField label="Shares" source="shares"/>
                <DateField label="Opened at:" source="opened_at"/>
                <NumberField label="Price" source="opened_price"/>
                <DateField label="Closed at:" source="closed_at" />
                <TradePrice label="Price" />
                <Info props={props}/>
            </Datagrid>
        </List>
    );
}

export const TradeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Currency" hidden={true} source="currency" defaultValue={'USD'} />
            <TextInput label="Market" source="market" defaultValue={'US'} />
            <TextInput label="Product" source="product" />
            <NumberInput label="Shares" source="shares"/>
            <DateInput label="Opened at:" source="opened_at"/>
            <NumberInput label="Price" source="opened_price"/>
            <DateInput label="Closed at:" source="closed_at" required={false}/>
            <NumberInput label="Price" source="closed_price"  required={false}/>

            <TextInput label="Provider" source="provider"  required={true}/>
        </SimpleForm>
    </Create>
);

export const TradeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput label="Currency" hidden={true} source="currency" defaultValue={'USD'} />
            <TextInput label="Market" source="market" defaultValue={'US'} />
            <TextInput label="Product" source="product" />
            <NumberInput label="Shares" source="shares"/>
            <DateInput label="Opened at:" source="opened_at"/>
            <NumberInput label="Price" source="opened_price"/>
            <DateInput label="Closed at:" source="closed_at" required={false}/>
            <NumberInput label="Price" source="closed_price"  required={false}/>

            <TextInput label="Provider" source="provider"  required={true}/>
        </SimpleForm>
    </Edit>
);

export const TradeShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label="Currency" hidden={true} source="currency" defaultValue={'USD'} />
            <TextField label="Market" source="market" defaultValue={'US'} />
            <TextField label="Product" source="product" />
            <NumberField label="Shares" source="shares"/>
            <DateField label="Opened at:" source="opened_at"/>
            <NumberField label="Price" source="opened_price"/>
            <DateField label="Closed at:" source="closed_at"/>
            <NumberField label="Price" source="closed_price"/>

            <TextField label="Provider" source="provider"/>
        </SimpleShowLayout>
    </Show>
);
