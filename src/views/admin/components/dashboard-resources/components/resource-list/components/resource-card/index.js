import React from 'react';
import moment from 'moment';
import {Card, Row, Col, Button} from 'antd';
import {ResourceCardContainer, ButtonsContainer} from './elements';

const {Meta} = Card;

const linkOrFile = link => (link.indexOf('amazonaws') === -1 ? 'link' : 'file');

const ResourceCard = ({resource: {name, link, date}}) => {
  return (
    <ResourceCardContainer>
      <Row>
        <Col span={12}>
          <Meta
            title={name}
            description={moment(date).format('MMMM DD YYYY')}
          />
        </Col>
        <Col span={12}>
          <ButtonsContainer>
            {linkOrFile(link) === 'file' && (
              <Button
                style={{margin: 5}}
                href={link}
                type="dashed"
                icon="download"
              />
            )}
            <Button
              style={{margin: 5}}
              href={
                linkOrFile(link) === 'file'
                  ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${link}`
                  : link
              }
              target="_blank"
              rel="noopener noreferrer"
              type="dashed"
              icon="picture"
            />
          </ButtonsContainer>
        </Col>
      </Row>
    </ResourceCardContainer>
  );
};

export default ResourceCard;
