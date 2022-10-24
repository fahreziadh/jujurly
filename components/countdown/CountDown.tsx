import moment from "moment";
import { useEffect, useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import {
  STATE_LOADING,
  STATE_ENDED,
  STATE_NOT_STARTED,
  STATE_STARTED,
} from "../../pages/participant/[...slug]";
import { CountdownRenderer } from "./CountDownRenderer";

interface Props {
  start: string;
  end: string;
  currentState: string;
}

export default function CountDown(props: Props) {
  const countDown: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    // Check if the countdown has finished

    return (
      <CountdownRenderer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  };

  return (
    <div className=" mt-10 text-center">
      {/* Timer */}

      {props.currentState === STATE_LOADING && <>Tunggu Sebentar...</>}
      {props.currentState === STATE_NOT_STARTED && (
        <div>
          <p>Voting Akan Dimulai pada : </p>
          <Countdown date={props.start} renderer={countDown} />
        </div>
      )}
      {props.currentState === STATE_ENDED && (
        <span className="bg-zinc-100 px-3 py-1 font-medium text-lg">
          Voting Telah Berakhir
        </span>
      )}
      {props.currentState === STATE_STARTED && (
        <div>
          <span>Voting Sedang Berlangsung :</span>
          <Countdown date={props.end} renderer={countDown} />
        </div>
      )}

      {/* End Timer */}
    </div>
  );
}
