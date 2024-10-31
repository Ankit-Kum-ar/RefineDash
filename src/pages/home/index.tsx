import { Col, Row } from "antd";
import UpcomingEvents from "./components/upcoming-events";
import DealsChart from "./components/deals-chart";

export const Home = () => {
    return (
        <div>
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
                    xl={8} // 8 columns on extra large screens
                    style={{height: "460px"}} // 460px height on all screens
                >
                    <DealsChart/> 
                </Col>
            </Row>
        </div>
    );
}
