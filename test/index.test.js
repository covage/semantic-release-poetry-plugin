const SemanticReleaseError = require('@semantic-release/error');
const plugin = require('../src/index');
const fs = require('fs').promises;
const toml = require('smol-toml');

describe('semantic release integration', () => {
    test('replace simple TOML', async () => {
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
    test('replace invalid TOML', async () => {
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

        fs.readFile = jest.fn().mockResolvedValue(toml.stringify(mockPyproject).replace("=", "}"));
        fs.writeFile = jest.fn().mockResolvedValue();

        await expect(async () => {
            await plugin.prepare({}, context);
        }).rejects.toThrow("Error while replacing version in pyproject.toml: Invalid TOML document");
    });
}); 
