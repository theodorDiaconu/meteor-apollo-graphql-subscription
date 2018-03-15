import * as Scalars from './scalars';
import * as Entities from './entities';
import * as Modules from './modules';
import { getSchema } from 'graphql-loader';
import load from './loader';

const Accounts = getSchema();

export default load([Scalars, Entities, Modules, Accounts]);
