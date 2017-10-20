import * as React from 'react';
import { sleep } from '../utils';

export interface Props {
  /** The number in seconds to count down from. */
  startAt: number;
}

export interface State {
  timeRemaining: number;
}

const INTERVAL = 1000; // 1 second

export default class Countdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      timeRemaining: props.startAt,
    };
  }

  async start(afterCountdown: () => void) {
    this.setState({ timeRemaining: this.props.startAt });
    await this.countdown();
    afterCountdown();
  }

  private async countdown() {
    while (this.state.timeRemaining > 0) {
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
      await sleep(INTERVAL);
    }
  }

  render() {
    return <h1>{this.state.timeRemaining}</h1>;
  }
}
