import { useState, useEffect } from "react";
import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../assets/cryptocurrency.png";

type Menu = {
  title: string;
  path: string;
  icon: JSX.Element;
};

type Size = null | number;

const menu: Menu[] = [
  {
    title: "Home",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    title: "Cryptocurrencies",
    path: "/cryptocurrencies",
    icon: <FundOutlined />,
  },
  {
    title: "Exchanges",
    path: "/exchanges",
    icon: <MoneyCollectOutlined />,
  },
  {
    title: "News",
    path: "/news",
    icon: <BulbOutlined />,
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<Size>(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize !== null && screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        <button
          className='menu-control-container'
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </button>
      </div>
      {activeMenu && (
        <Menu theme='dark'>
          {menu.map((el) => (
            <Menu.Item key={el.title} icon={el.icon}>
              <Link to={el.path}>{el.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
