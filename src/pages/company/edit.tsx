import CustomAvatar from "@/components/custom-avatar"
import SelectOptionWithAvatar from "@/components/select-option-with-avatar"
import { businessTypeOptions, companySizeOptions, industryOptions } from "@/constants"
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations"
import { USERS_SELECT_QUERY } from "@/graphql/queries"
import { UsersSelectQuery } from "@/graphql/types"
import { getNameInitials } from "@/utilities"
import { Edit, useForm, useSelect } from "@refinedev/antd"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import { CompanyContactsTable } from "./contacts-table"

const EditPage = () => {
    const { saveButtonProps, formProps, formLoading, queryResult } = useForm({ // This is a hook from refinedev/antd. It provides the saveButtonProps, formProps, formLoading and queryResult to the form.
        redirect: false, // This will not redirect to the list page after updating a record.
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION // This is the mutation that is used to update a new record.
        }
    }) 

    const { selectProps, queryResult: queryResultUsers } = useSelect<GetFieldsFromList<UsersSelectQuery>>({ 
        resource: 'users', // This is the resource name that is used to fetch the data.
        optionLabel: 'name', // This is the option label that is used to display the data in the select field.
        meta: { gqlQuery: USERS_SELECT_QUERY }, // This is the gqlQuery that is used to fetch the data from the server.
        pagination: {
            mode: 'off' // This is the mode of the pagination. It is set to off.
        }
    }) // This is a hook from refinedev/antd. It provides the selectProps and queryResults to the select field.

    const { avatarUrl, name } = queryResult?.data?.data || {} // This is used to get the avatarUrl and name from the queryResult.

    return (
        <div>
            <Row
                gutter={[32, 32]} // This is the space between the columns.
            >
                <Col
                    xs={24} // This is the number of columns to show on extra small screens.
                    xl={12} // This is the number of columns to show on extra large screens.
                >
                    <Edit
                        isLoading={formLoading} // This is used to show the loading state of the form.
                        saveButtonProps={saveButtonProps} // This is used to pass the saveButtonProps to the form.
                        breadcrumb={false} // This will hide the breadcrumb from the edit page.
                    >
                        <Form {...formProps} layout="vertical"> {/* This is used to pass the formProps to the form. The layout is set to vertical. */}
                            <CustomAvatar 
                                shape="square" // This is the shape of the avatar.
                                src={avatarUrl}  // This is the source of the avatar.
                                name={getNameInitials(name || '')} // This is the name of the user.
                                style={{width: 96, height: 96, marginBottom: '24px' }} 
                            /> {/* This is the CustomAvatar component. */}
                            <Form.Item
                                label="Sales Owner" // This is the label of the input field.
                                name="salesOwnerId" // This is the name of the input field.
                                initialValue={ formProps?.initialValues?.salesOwner?.id } // This is the initial value of the input field.
                            >   
                                <Select
                                    placeholder="Please select the sales owner" // This is the placeholder of the select field.
                                    {...selectProps} // This is used to pass the selectProps to the select field.
                                    options={
                                        queryResultUsers.data?.data.map((user) => ({ // This is used to map the data to the options.
                                            value: user.id, // This is the value of the option.
                                            label: (
                                                <SelectOptionWithAvatar
                                                    name={user.name} // This is the name of the user.
                                                    avatarUrl={user.avatarUrl ?? undefined} // This is the avatarUrl of the user.

                                                /> // This is the SelectOptionWithAvatar component.
                                            )
                                        })) ?? [] // This is the default value if the data is not available.
                                    }
                                /> 
                            </Form.Item>
                            <Form.Item>
                                <Select options={companySizeOptions} />  {/* This is the Select component. It is used to display the options. */}
                            </Form.Item>
                            <Form.Item>
                                <InputNumber 
                                    autoFocus
                                    addonBefore="$" // This is the addonBefore. It is used to display the addon before the input field.
                                    min={0} // This is the minimum value of the input field.
                                    placeholder="0,00" // This is the placeholder of the input field.
                                />
                            </Form.Item>
                            <Form.Item label="Industry">
                                <Select options={industryOptions} />
                            </Form.Item>
                            <Form.Item label="Business Type">
                                <Select options={businessTypeOptions} />
                            </Form.Item>
                            <Form.Item label="Country" name="country">
                                <Input placeholder="Country" /> {/* This is the input field. */}
                            </Form.Item>
                            <Form.Item label="Website" name="website">
                                <Input placeholder="Website" /> {/* This is the input field. */}
                            </Form.Item>
                        </Form>
                    </Edit> {/* This is the Edit component. */}
                </Col>
                <Col xs={24} xl={12}>
                    <CompanyContactsTable /> {/* This is the CompanyContactsTable component. */}
                </Col>
            </Row>
        </div>
    )
}

export default EditPage
