import { LatestActivitiesSkeleton } from '@/components'
import CustomAvatar from '@/components/custom-avatar'
import { Text } from '@/components/text'
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries'
import { UnorderedListOutlined } from '@ant-design/icons'
import { useList } from '@refinedev/core'
import { Card, List, Space } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

const LatestActivites = () => {
    // Get audit data using useList hook
    const { data: audit, isLoading: isLoadingAudit, isError, error } = useList({ // useList hook
        resource: "audits", // audit resource from the refined db
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY // DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY query
        }
    });

    // Get deal ids from audit data
    const dealIds = audit?.data?.map((audit) => audit?.targetId); // map deal ids from audit data

    // Get deals data using deal ids from audit data 
    const { data: deals, isLoading: isLoadingDeals } = useList({ // useList hook
        resource: "deals", // deals resource from the refined db
        queryOptions: { 
            enabled: !!dealIds?.length, // enabled if dealIds length is truthy
        },
        pagination : {
            mode: 'off' // pagination mode is off means no pagination
        },
        filters: [{ // The filter is applied to the dealIds to get the deals
            field: 'id',
            operator: 'in',
            value: dealIds
        }],
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY // DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY query
        }
    });

    if(isError) {
        console.log(error);
        return null;        
    }

    const isLoading = isLoadingAudit || isLoadingDeals; // isLoading is true if isLoadingAudit or isLoadingDeals is true

    return (
        <Card
            headStyle={{ padding : '16px'}} // 16px padding top and bottom 
            bodyStyle={{ padding: '0 1rem'}} // 0 padding top and bottom, 1rem padding left and right
            title = {
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}> {/* flex container with 8px gap between children */}
                    <UnorderedListOutlined/> {/* UnorderedListOutlined icon */}
                    <Text size='sm' style={{marginLeft: '0.5rem'}}> {/* Text component */}
                        Latest Activities
                    </Text>
                </div>
            }
        >
            {isLoading ? (
                <List
                    itemLayout="horizontal" // horizontal list
                    dataSource={Array.from({length: 5}).map((_, index) => ({
                        id: index, // unique id
                    }))} // 5 items
                    renderItem={ (_,index) => <LatestActivitiesSkeleton key={index}/> } // Skeleton component
                />
            ) : (
                <List
                    itemLayout='horizontal' // horizontal list
                    dataSource={audit?.data} // audit data source
                    renderItem={
                        (item) => {
                            const deal = deals?.data.find((deal) => deal.id === String(item.targetId)) || undefined; // find deal by id from deals data
                            return (
                                <List.Item> 
                                    <List.Item.Meta
                                        title={dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')} // format date using dayjs
                                        avatar= {
                                            <CustomAvatar
                                                shape="square" // square shape
                                                size={48} // 48px size
                                                src={deal?.company.avatarUrl} // company avatarUrl
                                                name={deal?.company.name} // company name
                                            /> // CustomAvatar component
                                        }
                                        description= {
                                            <Space size={4}>
                                                <Text strong>{item.user?.name}</Text>
                                                <Text>{item.action === 'CREATE' ? 'created' : 'moved'}</Text>
                                                <Text strong>{deal?.title}</Text> 
                                                <Text>deal</Text>
                                                <Text>{item.action === 'CREATE' ? 'in' : 'to'}</Text>
                                                <Text strong>{deal?.stage?.title}</Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )
                        }
                    }
                />
            )} 
        </Card>
    )
}

export default LatestActivites
