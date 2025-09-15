# Demo Code Standards

### Basic Demo Requirements

- Keep demo code as concise as possible.
- Avoid redundant code to facilitate direct copying and use in your projects.
- Each demo should focus on demonstrating a single feature.
- Provide instructions in both Chinese and English.
- Follow a demo-first principle to ensure good visual quality.
- Demonstrate the main usage scenarios of the component.
- Arrange demos from simple to complex.

### API Documentation

- Use a table format to document the API.

| Property  | Description | Type                       | Default      | Global Config |
| --------- | ----------- | -------------------------- | ------------ | ------------- |
| htmlType  | xxx         | string                     | `button`     | ✅            |
| type      | xxx         | `horizontal` \| `vertical` | `horizontal` | ✅            |
| disabled  | xxx         | boolean                    | false        | ✅            |
| minLength | xxx         | number                     | 0            | ✅            |
| style     | xxx         | CSSProperties              | -            |

- Provide API documentation for each component.
- Provide API documentation in Chinese and English.
- API documentation is located in each component's `doc/` folder.
