import { Container } from "react-bootstrap";

const CustomContainer = ({ children }) => {
  return (
    <Container
      style={{
        maxWidth: "1475px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
