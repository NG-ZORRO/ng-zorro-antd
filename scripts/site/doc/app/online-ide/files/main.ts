export default (componentName: string) => `import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { ${componentName} } from './app/app';

bootstrapApplication(${componentName}, appConfig)
  .catch((err) => console.error(err));
`;
