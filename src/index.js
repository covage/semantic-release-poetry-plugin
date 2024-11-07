const fs = require('fs').promises;
const SemanticReleaseError = require('@semantic-release/error');
const { replaceTomlToolPoetryVersion } = require('./poetry_version_replace');
const { parse: parseToml } = require('smol-toml');

const DEFAULT_PYPROJECT_FILE_NAME = 'pyproject.toml';

async function prepare(pluginConfig, context) {
    const { nextRelease, logger } = context;

    const pyprojectPath = DEFAULT_PYPROJECT_FILE_NAME;

    try {
        const content = await fs.readFile(pyprojectPath, 'utf8');

        const nextVersionRepr = nextRelease.version;
        const updatedContent = replaceTomlToolPoetryVersion(content, nextVersionRepr);

        // verify to ensure TOML validity
        parseToml(updatedContent);

        await fs.writeFile(pyprojectPath, updatedContent);

        logger.log(`Updated pyproject.toml version to ${nextRelease.version}`);
    } catch (error) {
        throw new SemanticReleaseError(
            "Error while replacing version in pyproject.toml: " + error.message
        );
    }
}

module.exports = {
    prepare
};