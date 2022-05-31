import React from 'react';
import Progress from '@iso/components/uielements/progress';
import { ProgressWidgetWrapper } from './ProgressWidget.styles';

export default function ProgressWidget({
  label,
  icon,
  iconcolor,
  details,
  percent,
  barHeight,
  status,
  extra_details
}) {
  const iconStyle = {
    color: iconcolor,
  };

  return (
    <ProgressWidgetWrapper className="isoProgressWidget">
      <div className="isoProgressWidgetTopbar">
        <h3>{label}</h3>
        <i className={icon} style={iconStyle} />
      </div>

      <div className="isoProgressWidgetBody">
        <p className="isoDescription">{details}</p>
        <Progress
          percent={percent}
          strokeWidth={barHeight}
          status={status}
          showInfo={false}
        />
      </div>
      <p style={{color:'rgba(0,0,0,0.6)', textAlign: 'end'}} className="isoDescription">{extra_details}</p>
    </ProgressWidgetWrapper>
  );
}
