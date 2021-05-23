import React from 'react';
import { Text, Row, Col, Grid, Spacer, Button } from '@nextui/react';
import { ImageBrowser } from '@components';

const Hero: React.FC = () => {
  return (
    <>
      <Row className="hero-container">
        <Col span={6}>
          <Text h1 className="hero__title" size="4rem">
            Beautiful, fast and
          </Text>
          <Text h1 size="4rem" className="hero__title hero__title-smooth">
            modern React UI library.
          </Text>
          <Spacer y={1.5} />
          <Grid.Container gap={2} justify="center">
            <Grid xs={6}>
              <Row align="middle">
                <img src="/responsive.svg" width="24" alt="responsive icon" />
                <Spacer />
                <Text b size="1.1rem">
                  Responsive design
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="middle">
                <img src="/components.svg" width="24" alt="components icon" />
                <Spacer />
                <Text b size="1.1rem">
                  +100 Components
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="middle">
                <img src="/graph.svg" width="24" alt="graph icon" />
                <Spacer />
                <Text b size="1.1rem">
                  Graph & analytics
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="middle">
                <img src="/open_source.svg" width="24" alt="open source icon" />
                <Spacer />
                <Text b size="1.1rem">
                  Open source
                </Text>
              </Row>
            </Grid>
          </Grid.Container>
          <Spacer y={2} />
          <Row align="middle">
            <Button>Get Started</Button>
            <Spacer x={1} />
            <Button light>View on Github</Button>
          </Row>
        </Col>
        <Col span={6} className="hero__image-container">
          <ImageBrowser className="hero__image" />
        </Col>
      </Row>
      <style jsx>{`
        :global(.hero-container) {
          padding: 14vh 0 0 0;
        }
        :global(.hero__title) {
          margin-bottom: 0rem;
          line-height: 1.2;
        }
        :global(.hero__title-smooth) {
          color: #c1c1c1 !important;
        }
        :global(.hero__image) {
          transform: translate3d(0, -50px, 0);
        }
      `}</style>
    </>
  );
};

export default Hero;
