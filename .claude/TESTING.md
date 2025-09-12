# Testing Guidelines

### Testing Framework and Tools

- Use Karma and Jasmine for unit testing
- Require 100% of code coverage
- Follow unit testing best practices
- Keep tests simple and focused
- Use testing helpers. You can find the helpers in the directory `components/core/testing`
- Respect the existing testing structure
- Ensure all tests pass; if not, please fix them

### Testing Scripts

```bash
npm test # Run all tests
npm test -- --watch # Watch mode
npm run test -- --include="**/mention.spec.ts" # Run tests for a specific file (here: mention)
```
