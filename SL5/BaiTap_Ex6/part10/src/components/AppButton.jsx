import Button from 'react-bootstrap/Button';

// ES6: Arrow function, default parameters, rest parameter & spread operator
const AppButton = ({ variant = 'primary', children, ...rest }) => (
  <Button variant={variant} {...rest}>
    {children}
  </Button>
);

export default AppButton;
