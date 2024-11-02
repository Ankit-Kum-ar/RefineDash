import { Form, Input, Modal, Select } from "antd"
import { CompanyList } from "./list"
import { useModalForm, useSelect } from "@refinedev/antd"
import { useGo } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";

const Create = () => {
    const go = useGo(); // This hook is used to for navigation.
    const goToListPage = () => {
        go({
            to: { resource: 'companies', action: 'list' }, // This is the resource name and action name to navigate to the list page.
            options: { keepQuery: true }, // This option is used to keep the query params in the URL.
            type: 'replace' // This is the type of navigation. It will replace the current URL.
        })
    } // This function is used to navigate to the list page.

    const { formProps, modalProps } = useModalForm({
        action: 'create', // This action is used to create a new record.
        defaultVisible: true, // This will show the modal by default.
        resource: 'companies', // This is the resource name that used to fetch the data.
        redirect: false, // This will not redirect to the list page after creating a new record.
        mutationMode: 'pessimistic', // This is the mutation mode. The UI will be updated after the mutation is successful.
        onMutationSuccess: goToListPage, // This function will be called after the mutation is successful.
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION // This is the mutation that is used to create a new record.
        }  // This is the meta object that is used to pass the extra data to the mutation.
    }) // This is a hook from refinedev/antd. It provides the formProps and modalProps to the form. It also provides the modalProps to the modal.

    const { selectProps, queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({ 
        resource: 'users', // This is the resource name that is used to fetch the data.
        optionLabel: 'name', // This is the option label that is used to display the data in the select field.
        meta: { gqlQuery: USERS_SELECT_QUERY } // This is the gqlQuery that is used to fetch the data from the server.
    }) // This is a hook from refinedev/antd. It provides the selectProps and queryResults to the select field.

    return (
        <CompanyList>
            <Modal
             {...modalProps} // This is used to pass the modalProps to the modal.
             mask={true} // The mask is used to show the modal with a mask. The mask is a background that is used to show the modal.
             onCancel={goToListPage} // This function is used to navigate to the list page when the modal is closed.
             title="Create Company" // This is the title of the modal.
             width={512} // This is the width of the modal.
            >
                <Form {...formProps} layout="vertical" > {/*  This is used to pass the formProps to the form. The layout is set to vertical. */}
                    <Form.Item
                        label="Company name" // This is the label of the input field.
                        name="name" // This is the name of the input field.
                        rules={[{ required: true }]} // This is the validation rule for the input field.
                    >
                        {/* <Input placeholder="Please enter the company name" /> This is the input field. */}
                        <Input
                            placeholder="Please enter the company name"
                            value={formProps.form?.getFieldValue('name')} // This is used to get the value of the input field. 
                            onChange={(e) => formProps.form?.setFieldsValue({ name: e.target.value })} // This is used to set the value of the input field.
                        />
                    </Form.Item>
                    <Form.Item
                        label="Sales Owner" // This is the label of the input field.
                        name="salesOwnerId" // This is the name of the input field.
                        rules={[{ required: true }]} // This is the validation rule for the input field.
                    >   
                        <Select 
                            placeholder="Please select the sales owner" // This is the placeholder of the select field.
                            {...selectProps} // This is used to pass the selectProps to the select field.
                            options={
                                queryResult.data?.data.map((user) => ({ // This is used to map the data to the options.
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
                </Form>
            </Modal>
        </CompanyList>
    )
}

export default Create
