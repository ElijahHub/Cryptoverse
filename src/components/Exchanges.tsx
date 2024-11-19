import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";

import Loader from "./Loader";
import { useGetCryptosQuery } from "../services/cryptoApi";

type Currency = {
  uuid: string;
  name: string;
  price: number;
  rank: number;
  marketCap: number;
  change: number;
  iconUrl: string;
};

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptosQuery(20);
  const exchangesList = data?.data?.coins;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange: Currency) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className='exchange-image'
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.price)}</Col>
                    <Col span={6}>{millify(exchange.marketCap)}</Col>
                    <Col span={6}>{millify(exchange.change)}%</Col>
                  </Row>
                }
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus, velit temporibus cumque voluptatibus nesciunt
                  maiores minima? Ducimus repellat fuga sunt pariatur distinctio
                  iure in! Soluta culpa, similique, officia dolores laudantium
                  quidem odit at nostrum ipsam error mollitia quis ad quasi.
                </p>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
