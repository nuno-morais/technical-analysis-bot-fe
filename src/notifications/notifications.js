import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import { BooleanInput, Create, Datagrid, List, SimpleForm, TextField, TextInput } from 'react-admin';

export const NotificationList = props => {
    return (
        <List {...props}>
            <Datagrid >
                <TextField source="provider.name" />
                <TextField source="enabled" />
            </Datagrid>
        </List>
    );
}

export const NotificationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="provider.name" />
            <TextInput source="provider.webhook_url" />
            <TextInput source="provider.token" />
            <TextInput source="provider.chat_id" />
            <BooleanInput
                source="enabled"
                options={{
                    checkedIcon: <FavoriteIcon />,
                }}
                defaultValue={true}
            />
        </SimpleForm>
    </Create>
);
