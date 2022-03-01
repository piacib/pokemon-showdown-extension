import { useEffect } from 'react';
interface Props {
  timer: number;
  actionFunction: any;
  exitCondition?: boolean;
}
export const useTimer = ({ timer, actionFunction, exitCondition }: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (exitCondition) {
        return;
      }
      actionFunction();
    }, timer);
    return () => clearInterval(interval);
  }, [actionFunction, exitCondition, timer]);
};
