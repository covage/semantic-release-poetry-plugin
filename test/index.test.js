const plugin = require('../index');
const fs = require('fs').promises;
const toml = require('toml');

describe('semantic-release-poetry-plugin', () => {
  test('prepare updates version in pyproject.toml', async () => {
    // Mock context
    const context = {
      nextRelease: { version: '1.0.0' },
      logger: { log: jest.fn() }
    };

    // Mock fs
    const mockPyproject = {
      tool: {
        poetry: {
          version: '0.1.0'
        }
      }
    };

    fs.readFile = jest.fn().mockResolvedValue(toml.stringify(mockPyproject));
    fs.writeFile = jest.fn().mockResolvedValue();

    await plugin.prepare({}, context);

    expect(fs.writeFile).toHaveBeenCalled();
    const writtenContent = fs.writeFile.mock.calls[0][1];
    expect(writtenContent).toContain('version = "1.0.0"');
  });
}); 