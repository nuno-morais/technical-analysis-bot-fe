import React from 'react';
import { Create, Datagrid, List, SimpleForm, TextField, TextInput } from 'react-admin';

export const PortfolioList = props => {
    return (
        <List {...props}>
            <Datagrid >
                <TextField label="Market" source="market" />
                <TextField label="Product" source="product" />
            </Datagrid>
        </List>
    );
}

export const PortfolioCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Market" source="market" defaultValue={'US'} />
            <TextInput label="Product" source="product" />
            <TextInput label="Currency" hidden={true} source="currency" defaultValue={'USD'} />
        </SimpleForm>
    </Create>
);
