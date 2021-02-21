import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import { BooleanInput, Create, Datagrid, List, SimpleForm, TextField, TextInput } from 'react-admin';

export const NotificationList = props => {
    return (
        <List {...props}>
            <Datagrid >
                <TextField label="Provider Name" source="provider.name" />
                <TextField label="Is Enabled" source="enabled" />
            </Datagrid>
        </List>
    );
}

export const NotificationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Provider Name" source="provider.name" />
            <TextInput label="Provider Webhook (SLACK)" source="provider.webhook_url" />
            <TextInput label="Provider Token (TELEGRAM)" source="provider.token" />
            <TextInput label="Provider Chat Id (TELEGRAM)" source="provider.chat_id" />
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
