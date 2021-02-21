import React from 'react';
import { Create, Datagrid, List, SimpleForm, TextField, TextInput } from 'react-admin';

export const PortfolioList = props => {
    return (
        <List {...props}>
            <Datagrid >
                <TextField source="market" />
                <TextField source="product" />
            </Datagrid>
        </List>
    );
}

export const PortfolioCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="market" defaultValue={'US'} />
            <TextInput source="product" />
            <TextInput hidden={true} source="currency" defaultValue={'USD'} />
        </SimpleForm>
    </Create>
);
