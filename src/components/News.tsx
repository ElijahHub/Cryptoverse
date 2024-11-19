import { Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

type NewsResponse = {
  title: string;
  date: string;
  description: string;
  url: string;
  thumbnail: string;
};

const News = ({ simplified }: { simplified: boolean }) => {
  const count = simplified ? 6 : 12;
  const { data: cryptoNews } = useGetCryptoNewsQuery(10);

  if (!cryptoNews) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.slice(0, count).map((news: NewsResponse, i: number) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.title}
                </Title>
                <img
                  width={100}
                  height={100}
                  src={news.thumbnail}
                  alt={news.title}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={demoImage} alt='' />
                  <Text className='provider-name'>MSN</Text>
                </div>
                <Text>{moment(news.date).startOf("s").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
