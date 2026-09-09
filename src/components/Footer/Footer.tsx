import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">❖ СКАН</div>
        <div className="footer-info">
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@skan.ru</p>
          <p className="copyright">Copyright. 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;