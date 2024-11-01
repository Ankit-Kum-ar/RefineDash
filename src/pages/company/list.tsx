import CustomAvatar from '@/components/custom-avatar'
import { Text } from '@/components/text'
import { COMPANIES_LIST_QUERY } from '@/graphql/queries'
import { Company } from '@/graphql/schema.types'
import { currencyNumber } from '@/utilities'
import { SearchOutlined } from '@ant-design/icons'
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core'
import { Input, Space, Table } from 'antd'

export const CompanyList = () => {
  const go = useGo() // This is a hook from refinedev/core. It allows to navigate to a specific path.
  const { tableProps, filters } = useTable({
    resource: 'companies', // This is the resource name. It is used to navigate to a specific path.\
    onSearch: (values: { name: string }) => { // This is the onSearch. It is used to search the data in the table.
      return [
        {
          field: 'name', // This is the field. It is used to search the data in the table.
          operator: 'contains', // This is the operator. It is used to search the data in the table.
          value: values.name // This is the value. It is used to search the data in the table.
        }
      ]
    },
    pagination: {
      pageSize: 12 // This is the number of items to show on a page.
    },
    sorters: {
      initial: [
        {
          field: 'createdAt', // This is the field. It is used to sort the data in the table.
          order: 'desc' // This is the order. It is used to sort the data in the table.
        }
      ]
    },
    filters: {
      initial: [
        {
          field: 'name', // This is the field. It is used to filter the data in the table.
          operator: 'contains', // This is the operator. It is used to filter the data in the table.
          value: undefined // This is the value. It is used to filter the data in the table.
        }
      ] // This is the initial filter. It is used to filter the data in the table.
    },
    meta: { // This is the meta object. It is used to provide the meta information to the table.
      gqlQuery: COMPANIES_LIST_QUERY, // This is the gqlQuery. It is used to fetch the data from the server.
    }
  }) // This is a hook from refinedev/antd. It provides the tableProps and filters to the table. It also fetches the data from the server. 
  return (
    <List
      breadcrumb = {false} // This will hide the breadcrumb from the list page. breadcrumb is what you see on top of the page.
      headerButtons = {() => (
        <CreateButton
          onClick = {() => { go({
            to: {
              resource: 'companies', // This is the resource name. It is used to navigate to a specific path.
              action: 'create' // This is the action name. It is used to navigate to a specific path.
            },
            options: {
              keepQuery : true // This will keep the query params when navigating to a new path.
            },
            type: 'replace' // This will replace the current path with the new path.
          }
        )}} // This will navigate to the path '/companies/new' when the button is clicked on.
        /> // This button allows to navigate to a specific path to create new companies.
      )}
    > {/* List component from refinedev rather than antd. Because It provide some in-built functionalities. */}

      <Table 
        {...tableProps} // This will pass the tableProps to the Table component.
        pagination = {{
          ...tableProps.pagination, // This will pass the pagination props to the Table component.
        }}
      >
          <Table.Column<Company> // This is the Table.Column. It is used to display the data in the table.
            dataIndex='name' // This is the dataIndex. It is used to display the data in the table.
            title='Company Title' // This is the title. It is used to display the title in the table.
            defaultFilteredValue={getDefaultFilter('id', filters)} // This is the defaultFilteredValue. It is used to filter the data in the table.
            filterIcon={<SearchOutlined />} // This is the filterIcon. It is used to display the filter icon in the table.
            filterDropdown={(props) => (
              // This is the filterDropdown. It is used to display the filter dropdown in the table.
              <FilterDropdown {...props}>  
                <Input placeholder="Search Company"/>
              </FilterDropdown>
            )} // This is the filterDropdown. It is used to display the filter dropdown in the table.
            render={(value, record) => (
              <Space>
                <CustomAvatar shape='square' name={record.name} src={record.avatarUrl} />
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Company> 
            dataIndex='totalRevenue' // This is the dataIndex. It is used to display the data in the table.
            title='Open deals amount' // This is the title. It is used to display the title in the table.
            render={(value, company) => (
              <Text>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)} {/* The meaning of this line is to display the currency number in the table. */}  
                {/* dealsAggregate is in the types of Company and also mentioned in COMPANIES_LIST_QUERY */}
              </Text>
            )} // This is the render. It is used to display the data in the table.
          />
          <Table.Column<Company> 
            dataIndex = 'id' 
            title = 'Actions'
            // fixed = 'right
            render={(value) => (
              <Space>
                <EditButton hideText size='small' recordItemId={value}/>
                <DeleteButton hideText size='small' recordItemId={value}/>
              </Space>
            )}
          />
      </Table> 
    </List>
  )
}
