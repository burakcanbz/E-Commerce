import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import type { JSX } from "react"

const CustomContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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