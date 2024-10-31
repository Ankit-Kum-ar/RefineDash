import { UpcomingEventsSkeleton } from "@/components"
import { Text } from "@/components/text"
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries"
import { getDate } from "@/utilities/helpers"
import { CalendarOutlined } from "@ant-design/icons"
import { useList } from "@refinedev/core"
import { Badge, Card, List } from "antd"

const UpcomingEvents = () => {
    const { data, isLoading } = useList({
        resource: "events", // events resource from the refined database.
        pagination: { pageSize: 5 }, // 5 items per page
        sorters: [ // sort by startDate in ascending order
            {
                field: "startDate", // sort by startDate
                order: "asc", // ascending order
            }
        ],  
        meta : {
            gqlQuery : DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY, // gql query
        } // meta object
    })
    // alert(JSON.stringify(data))
    return (
        <Card 
            style={{height: '100% '}} // 100% height
            headStyle={{padding: '8px 16px'}} // 8px padding top and bottom, 16px padding left and right
            bodyStyle={{padding: '0 1rem'}} // 0 padding top and bottom, 1rem padding left and right
            title={
                <div
                    style={{display: 'flex', alignItems: 'center', gap: '8px'}} // flex container with 8px gap between children 
                >
                    <CalendarOutlined/>
                    <Text size="sm" style={{marginLeft: "0.7rem"}}>Upcoming Events</Text>
                </div>
            }
        >

            {/* Loading state */}
            {isLoading ? (
                <List
                    itemLayout="horizontal" // horizontal list
                    dataSource={Array.from({length: 5}).map((_, index) => ({
                        id: index, // unique id
                    }))} // 5 items
                    renderItem={ () => <UpcomingEventsSkeleton/> } // UpcomingEventsSkeleton component
                />
            ) : (
                <List
                    itemLayout="horizontal" // horizontal list
                    dataSource={data?.data || []} // data source
                    
                    // render item
                    renderItem={(item) => {
                        const renderDate = getDate(item.startDate, item.endDate); // get date
                        return (
                            <List.Item> 
                                <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title= {<Text size="xs">{renderDate}</Text>}
                                    description={<Text ellipsis={{ tooltip: true}} strong >{item.title}</Text>} // ellipsis is used to hide the text if it overflows the container and tooltip is used to show the text on hover
                                />
                            </List.Item>
                        )
                    }}
                />

            )}

            {!isLoading && data?.data?.length === 0 && ( // if data is not loading and data length is 0
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '220px',
                    }}
                >
                    No upcoming events
                </span>
            )}

        </Card>
    )
}

export default UpcomingEvents
