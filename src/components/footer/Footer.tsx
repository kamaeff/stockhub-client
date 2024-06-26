import './footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <a href="mailto:support@stockhub12.ru">@StockHub12</a>
      <div className="footer__info">
        <a
          href="https://telegra.ph/Dogovor-oferty-na-okazanie-uslugi-11-27"
          target="_blank"
          rel="noopener noreferrer"
        >
          Договор оферты
        </a>

        <a
          href="https://telegra.ph/Instrukciya-po-ispolzovaniyu-StockHubBot-12-13"
          target="_blank"
          rel="noopener noreferrer"
        >
          Иструкция
        </a>

        <a
          href="mailto:support@stockhub12.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@stockhub12.ru
        </a>
      </div>
    </div>
  );
};

export default Footer;
