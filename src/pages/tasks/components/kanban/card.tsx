import { TextIcon } from "@/components";
import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { User } from "@/graphql/schema.types";
import { getDateColor } from "@/utilities";
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { useDelete, useNavigation } from "@refinedev/core";
import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, theme, Tooltip } from "antd";
import dayjs from "dayjs";
import { memo, useMemo } from "react";

type ProjectCardProps = {
    id: string;
    title: string;
    updatedAt: string;
    dueDate?: string;
    users?: {
        id: string;
        name: string;
        avatarUrl?: User['avatarUrl'];
    }[]; // The users is used to determine the users of the project card.
}

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
    const { token } = theme.useToken(); // This is a design token from antd that is used to determine the token of the project card.
    const { edit } = useNavigation() // The useNavigation is used to determine the navigation of the project card.  
    const { mutate } = useDelete(); // The mutate is used to determine the mutate of the delete.

    const dropdownItems = useMemo(() => {
        const dropdownItems: MenuProps['items'] = [
            {
                label: 'View card', // The label is used to determine the label of the dropdown item.
                key: '1', // The key is used to determine the key of the dropdown item.
                icon: <EyeOutlined />, // The icon is used to determine the icon of the dropdown item.
                onClick: () => {
                    edit('tasks', id, 'replace')
                } // The onClick is used to determine the action when the dropdown item is clicked.
            },
            {
                danger: true, // The danger is used to determine if the dropdown item is dangerous.
                label: 'Delete card', // The label is used to determine the label of the dropdown item.
                key: '2', // The key is used to determine the key of the dropdown item.
                icon: <DeleteOutlined />, // The icon is used to determine the icon of the dropdown item.
                onClick: () => {
                    mutate({
                        resource: 'tasks',
                        id,
                        meta: {
                            operation: 'task'
                        }
                    })
                } // The onClick is used to determine the action when the dropdown item is clicked.
            }
        ]

        return dropdownItems;
    }, [])

    // Here we define the dueDateOptions to determine the color of the icon.
    const dueDateOptions = useMemo(() => {
        if (!dueDate)  return null;

        const date = dayjs(dueDate); // The date is used to determine the date of the due date.
        
        return {
            color: getDateColor({ date: dueDate }) as string, 
            text: date.format('MMM DD') // The text is used to determine the text of the due date.
        }
    }, [dueDate]) 

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag: {
                        colorText: token.colorTextSecondary, // The colorText is used to determine the color text of the tag.
                    },
                    Card: {
                        headerBg: 'transparent', // The headerBg is used to determine the header background of the card.
                    }
                }
            }}
        > {/* The ConfigProvider is used to provide the configuration of the project card such as theme, colors and more */}
            <Card
                size="small" // The size is used to determine the size of the card.
                title={<Text ellipsis={{tooltip: title}}>{title}</Text>} // The title is used to determine the title of the card.
                onClick={() => edit( 'tasks', id, 'replace' )} // The onClick is used to determine the action when the card is clicked.
                extra={
                    <Dropdown
                        trigger={['click']} // The trigger is used to determine the trigger of the dropdown.
                        menu={{
                            items: dropdownItems,
                            onPointerDown: (e) => e.stopPropagation(),
                            onClick: (e) => e.domEvent.stopPropagation(),
                        }}
                        placement="bottom"
                        arrow={{pointAtCenter: true}} 
                    >
                        <Button
                            type="text" // The type is used to determine the type of the button.
                            shape="circle" // The shape is used to determine the shape of the button.
                            icon= {
                                <MoreOutlined 
                                    style={{
                                        transform: 'rotate(90deg)' // The transform is used to determine the transform of the icon.
                                    }}
                                /> // The icon is used to determine the icon of the button.
                            }
                            onPointerDown={(e) => e.stopPropagation()} // The onPointerDown is used to determine the action when the button is clicked.
                            onClick={(e) => e.stopPropagation()} // The onClick is used to determine the action when the button is clicked.
                        />
                    </Dropdown>
                }
            >
                <div
                    style={{
                        display: 'flex', // The display is used to determine the display of the project card.
                        flexWrap: 'wrap', // The flexWrap is used to determine the flex wrap of the project card.
                        alignItems: 'center', // The alignItems is used to determine the align items of the project card.
                        gap: '8px', // The gap is used to determine the gap of the project card.
                    }}
                >
                    <TextIcon style={{marginRight: '4px'}} /> {/* The TextIcon is used to determine the text icon of the project card. */}
                    {dueDateOptions && (
                        <Tag
                            icon= {<ClockCircleOutlined style={{fontSize: '12px'}} />} 
                            style= {{
                                padding: '0px 4px', // Top and bottom padding is 0px and left and right padding is 4px.
                                marginInlineEnd: '0', // The marginInLineEnd is used to determine the margin in line end of the tag.
                                backgroundColor: dueDateOptions.color === 'default' ? 'transparent' : 'unset', // The backgroundColor is used to determine the background color of the tag.
                            }}
                            color={dueDateOptions.color} // The color is used to determine the color of the tag.
                            bordered={dueDateOptions.color !== 'default'} // If it has a color then it will be bordered.
                        >
                            {dueDateOptions.text}
                        </Tag>
                    )} {/* The dueDateOptions is used to determine that what should be color of icon. */}
                    {!!users?.length && (
                        <Space
                            size={4}
                            wrap
                            direction="horizontal" // The direction is used to determine the direction of the space.
                            align="center" // The align is used to determine the align of the space.
                            style={{
                                display: 'flex', // The display is used to determine the display of the space.
                                justifyContent: 'flex-end', // The justifyContent is used to determine the justify content of the space.
                                marginLeft: 'auto', // The marginLeft is used to determine the margin left of the space.
                                marginRight: '0', // The marginRight is used to determine the margin right of the space.
                            }}
                        >
                            {
                                users.map((user) => (
                                    <Tooltip key={user.id} title={user.name}>
                                        <CustomAvatar
                                            name={user.name} // The name is used to determine the name of the user.
                                            src={user.avatarUrl} // The src is used to determine the source of the user.
                                        />
                                    </Tooltip>
                                ))
                            }
                        </Space>
                    )}
                </div>

            </Card>
        </ConfigProvider>
    )
}

export default ProjectCard

// This is a memoized version of the ProjectCard component. It will only re-render if the props have changed. 
export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.title === next.title &&
        prev.updatedAt === next.updatedAt &&
        prev.dueDate === next.dueDate &&
        prev.users?.length === next.users?.length
    )
})