import { APP_NAME } from '../../data/menu';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5 border-top">
      <div className="container text-muted">
        {`© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`}
      </div>
    </footer>
  );
};

export default Footer;
