import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface ItemProps {
  value: number;
  label: string;
}
const CountDownItem = ({ label, value }: ItemProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col text-center">
        <span className="text-5xl font-bold">{value}</span>
        <span className="font-light text-xl">{label}</span>
      </div>
      {label !== "Detik" && <span className="mx-5 text-4xl">:</span>}
    </div>
  );
};
export const CountdownRenderer = (props: Props) => {
  return (
    <div className="flex flex-row mx-auto  justify-center">
      {props.days > 0 && <CountDownItem label="Hari" value={props.days} />}
      {props.hours > 0 && <CountDownItem label="Jam" value={props.hours} />}
      {props.minutes > 0 && (
        <CountDownItem label="Menit" value={props.minutes} />
      )}
      <CountDownItem label="Detik" value={props.seconds} />
    </div>
  );
};
