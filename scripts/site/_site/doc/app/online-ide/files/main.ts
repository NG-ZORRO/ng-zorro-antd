export default (componentName: string) => `import { bootstrapApplication } from '@angular/platform-browser';

import { ${componentName} } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(${componentName}, appConfig).catch(err => console.log(err));
`;
