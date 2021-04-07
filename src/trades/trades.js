import React from 'react';
import { Create, Datagrid, DateField, DateInput, List, NumberField, NumberInput, SimpleForm, TextField, TextInput } from 'react-admin';

export const Info = ({record: {shares, opened_price, closed_price}}) => {
    if (closed_price != null) {
        const value = shares * (closed_price - opened_price);
        return (<p>Value: {value}</p>)
    }
    return (<p>Opened</p>);
}

export const TradeList = props => {
    return (
        <List {...props}>
            <Datagrid >
                <TextField label="Market" source="market" />
                <TextField label="Product" source="product" />
                <TextField label="Currency" source="currency" />

                <NumberField label="Shares" source="shares"/>
                <DateField label="Opened at:" source="opened_at"/>
                <NumberField label="Price" source="opened_price"/>
                <DateField label="Closed at:" source="closed_at" />
                <NumberField label="Price" source="closed_price"/>
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
        </SimpleForm>
    </Create>
);
