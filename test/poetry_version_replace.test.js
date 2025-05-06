const poetryReplace = require('../src/poetry_version_replace');

describe('poetry version replace', () => {
    test('replace simple TOML 1', async () => {
        const content = [
            `[tool.poetry]`,
            `version = "0.1.0"`,
        ].join('\n')
        const res = poetryReplace.replaceTomlToolPoetryVersion(content, "1.0.0")
        expect(res.split('\n')[1]).toBe(`version = "1.0.0"`)
        expect(res.split('\n').length).toBe(2)
    });

    test('replace simple TOML 2', async () => {
        const content = [
            `[tool.poetry]`,
            `name = "my_lib"`,
            `version = "42.0.0"`,
            `description = "Lib to do thing"`
        ].join('\n')
        const res = poetryReplace.replaceTomlToolPoetryVersion(content, "43.2.3")
        expect(res.split('\n')[2]).toBe(`version = "43.2.3"`)
    });

    test('replace in full TOML', async () => {
        const content = [
            `[tool.poetry]`,
            `name = "my_lib"`,
            `version = "42.0.0"`,
            `description = "Lib to do thing"`,
            `authors = ["John Doe <john@example.org"]`,
            `keywords = []`,
            `license = "MIT"`,
            `readme = "README.md"`,
            ``,
            `[tool.poetry.dependencies]`,
            `python = "^3.12"`,
            `pydantic = "^2.9.2"`,
            ``,
            `[tool.poetry.group.dev.dependencies]`,
            `ruff = "0.6.8"`,
            ``,
            `[build-system]`,
            `requires = ["poetry-core"]`,
            `build-backend = "poetry.core.masonry.api"`,
            ``,
            `[tool.ruff]`,
            `line-length = 100`,
            `indent-width = 4`
        ].join('\n')
        const res = poetryReplace.replaceTomlToolPoetryVersion(content, "43.9.9")
        expect(res.split('\n')[2]).toBe(`version = "43.9.9"`)
    });

    test('replace with absent tool.poetry section', async () => {
        const content = [
            `name = "my_lib"`,
            `description = "Lib to do thing"`
        ].join('\n')

        expect(
            () => poetryReplace.replaceTomlToolPoetryVersion(content, "43.2.3")
        ).toThrow(Error("Could not find [tool.poetry] or [project] section in pyproject.toml"))
    });

    test('replace with absent tool.poetry.version field', async () => {
        const content = [
            `[tool.poetry]`,
            `name = "my_lib"`,
            `description = "Lib to do thing"`
        ].join('\n')

        expect(
            () => poetryReplace.replaceTomlToolPoetryVersion(content, "43.2.3")
        ).toThrow(Error("Could not find version key in pyproject.toml"))
    });

    test('replace in full TOML by uv', async () => {
        const content = [
            `[project]`,
            `name = "my_lib"`,
            `version = "42.0.0"`,
            `description = "Lib to do thing"`,
            `authors = ["John Doe <john@example.org"]`,
            `keywords = []`,
            `license = "MIT"`,
            `readme = "README.md"`,
        ].join('\n')
        const res = poetryReplace.replaceTomlToolPoetryVersion(content, "43.9.9")
        expect(res.split('\n')[2]).toBe(`version = "43.9.9"`)
    });
}); 

