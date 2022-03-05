import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const CategoryList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='edit'>
        <TextField source='_id'></TextField>
        <TextField source='name'></TextField>
        <TextField source='slug'></TextField>
        <TextField source='isActive'></TextField>
        <DateField source='createdAt'></DateField>
        <DateField source='updatedAt'></DateField>
        {/* <TextField source='serviceId'></TextField> */}
        <EditButton basePath='/category'></EditButton>
        <DeleteButton basePath='/category'></DeleteButton>
      </Datagrid>
    </List>
  );
};

export default CategoryList;
