import { Col, Typography } from "antd";

type Stat = {
  title: String;
  value: String;
  icon: JSX.Element;
};

type PropsType = {
  name: string;
  data: Stat[];
  main?: boolean;
};

const { Title, Text } = Typography;

const StatDisplay = ({ name, data, main }: PropsType) => {
  return (
    <Col className={main ? "other-stat-info" : "coin-value-statistics"}>
      <Col className='coin-value-statistics-heading'>
        <Title level={3} className='coin-details-heading'>
          {name} Value Statistics
        </Title>
        {!main ? (
          <p>
            An overview showing the statistics of {name}, such as the base and
            quote currency, the rank, and trading volume.
          </p>
        ) : (
          <p>An overview showing the stats of all cryptocurrencies</p>
        )}
      </Col>
      {data.map(({ icon, title, value }) => (
        <Col className='coin-stats'>
          <Col className='coin-stats-name'>
            <Text>{icon}</Text>
            <Text>{title}</Text>
          </Col>
          <Text className='stats'>{value}</Text>
        </Col>
      ))}
    </Col>
  );
};

export default StatDisplay;
