import { Col, Row } from "antd";
import UpcomingEvents from "./components/upcoming-events";
import DealsChart from "./components/deals-chart";
import DashboardTotalCountCard from "./components/total-count-card";
import { useCustom } from "@refinedev/core";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { DashboardTotalCountsQuery } from "@/graphql/types";
import LatestActivites from "./components/latest-activites";

export const Home = () => {
    const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
        url: '', // empty url as the data is fetched from the refined db
        method: 'get',
        meta: {
            gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY 
        }
    }); // useCustom hook used to fetch data from the refined db
    return (
        <div>
            {/* Row is a flex container with 24 columns */}
            <Row gutter={[32, 32]}> {/* 16px space between columns and rows */}
                <Col
                    xs={24} // 24 columns on extra small screens
                    sm={24} // 24 columns on small screens
                    xl={8} // 8 columns on extra large screens
                >
                    <DashboardTotalCountCard 
                        resource="companies" // resource is companies
                        isLoading={isLoading}
                        totalCount={data?.data.companies.totalCount} 
                    />
                </Col>
                <Col
                    xs={24} // 24 columns on extra small screens
                    sm={24} // 24 columns on small screens
                    xl={8} // 8 columns on extra large screens
                >
                    <DashboardTotalCountCard 
                        resource="contacts" // resource is contacts
                        isLoading={isLoading}
                        totalCount={data?.data.contacts.totalCount}
                    />
                </Col>
                <Col
                    xs={24} // 24 columns on extra small screens
                    sm={24} // 24 columns on small screens
                    xl={8} // 8 columns on extra large screens
                >
                    <DashboardTotalCountCard 
                        resource="deals"
                        isLoading={isLoading}
                        totalCount={data?.data.deals.totalCount}
                    />
                </Col>
            </Row>
            {/*  Row is a flex container with 24 columns */}
            <Row
                gutter={[32, 32]} // 16px space between columns and rows
                style={{marginTop: "32px"}} // 32px margin top
            > 
                <Col
                    xs={24} // 24 columns on extra small screens
                    sm={24} // 24 columns on small screens
                    xl={8} // 8 columns on extra large screens
                    style={{height: "460px"}} // 460px height on all screens
                >
                    <UpcomingEvents/> 
                </Col>
                <Col
                    xs={24} // 24 columns on extra small screens
                    sm={24} // 24 columns on small screens
                    xl={16} // 16 columns on extra large screens
                    style={{height: "460px"}} // 460px height on all screens
                >
                    <DealsChart/> 
                </Col>
            </Row>
            <Row
                gutter={[32, 32]} // 16px space between columns and rows
                style={{marginTop: "32px"}} // 32px margin top
            >
                <Col
                    xs={24} // 24 columns on extra small screens
                >
                    <LatestActivites />
                </Col>
            </Row>
        </div>
    );
}
