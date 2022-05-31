import React from 'react';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableDemoStyle from './Demo.styles';
import fakeData from '../data';
import { tableinfos } from './configs';
import * as TableViews from './TableViews/TableViews';

const dataList = new fakeData(10);

export default function AntTable() {

  return (
    <LayoutContentWrapper>
      <TableDemoStyle className="isoLayoutContent">
        <Tabs className="isoTableDisplayTab">
          {tableinfos.map(tableInfo => (
            <TabPane tab={tableInfo.title} key={tableInfo.value}>
              <TableViews.EditView tableInfo={tableInfo} dataList={dataList} />
            </TabPane>
          ))}
        </Tabs>
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableinfos, dataList };
