
import winston from 'winston';
import cluster from 'cluster';
import winstonCluster from 'winston-cluster';
import { runModeFlags, whenRunModeLoaded } from '../run-mode';

export const logger = winston;

winston.level = 'info';
whenRunModeLoaded(() => {
	winston.level = runModeFlags.get('log') || 'info';
});

export const bindWorkers = () => {
	if (cluster.isMaster) {
		winstonCluster.bindListeners();
	}
};

if (cluster.isMaster) {
	winston.remove(winston.transports.Console);
	winston.add(winston.transports.Console, {
		timestamp: runModeFlags.has('log:timestamp'),
		colorize: true
	});
}

else {
	winston.remove(winston.transports.Console);
	winston.add(winston.transports.Cluster, { });
}
