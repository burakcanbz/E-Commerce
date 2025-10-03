import { Container } from "react-bootstrap";

const CustomContainer = ({ children }) => {
  const isDesktop = window.innerWidth >= 768;
  return (
    <Container
      style={{
        maxWidth: "1475px",
        paddingLeft: isDesktop ? "20px" : "7px",
        paddingRight: isDesktop ? "20px" : "7px",
      }}
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
