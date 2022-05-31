import React from 'react';
import { Row, Col } from 'antd';
import SaleWidget from '@iso/containers/Widgets/Sale/SaleWidget';
import IsoWidgetsWrapper from '@iso/containers/Widgets/WidgetsWrapper';


import basicStyle from '@iso/assets/styles/constants';
const { rowStyle, colStyle } = basicStyle;

export default function walletBalance({allData}) {

return (
  <Row style={{rowStyle, width: 600}} gutter={0} justify="start">

      <Col lg={12} md={12} sm={12} xs={24} style={{...colStyle, width: 300}}>
        <IsoWidgetsWrapper>
          {/* Sale Widget */}
          <SaleWidget
            label={'Your Wallet'}
            price={allData.walletAmount.toLocaleString() + ' POKT'}
            details={'Node Runner 24 wallet balance'}
            fontColor={ '#F75D81'}
          />
        </IsoWidgetsWrapper>
      </Col>

  </Row>
  )
}
