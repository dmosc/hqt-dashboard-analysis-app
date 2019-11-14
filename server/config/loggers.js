import {Signale} from 'signale';

const seeder = new Signale({
  interactive: true,
  scope: 'db:seed',
  config: {
    displayTimestamp: true,
    displayDate: true,
  },
});

const dropper = new Signale({
  interactive: true,
  scope: 'db:drop',
  config: {
    displayTimestamp: true,
    displayDate: true,
  },
});

export {seeder, dropper};
