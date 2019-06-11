import { task } from 'gulp';
import { buildConfig } from '../../build-config';
import { cleanTask } from '../util/task-helpers';

/** Deletes the dist/ publish/ directory. */
task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir]));
