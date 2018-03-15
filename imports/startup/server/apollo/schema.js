import mainSchema from '/imports/api/graphql';
import accountsSchema from './accounts';
import { mergeSchemas } from 'graphql-tools';

export default mainSchema;
// export default mergeSchemas({
// schemas: [mainSchema, accountsSchema]
// });
