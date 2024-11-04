const toml = require('toml');
const fs = require('fs').promises;
const SemanticReleaseError = require('@semantic-release/error');

async function prepare(pluginConfig, context) {
  const { nextRelease, logger } = context;
  const pyprojectPath = 'pyproject.toml';

  try {
    // Read the pyproject.toml file
    const content = await fs.readFile(pyprojectPath, 'utf8');
    const pyproject = toml.parse(content);

    // Update the version
    if (!pyproject.tool || !pyproject.tool.poetry) {
      throw new SemanticReleaseError(
        'Poetry configuration not found in pyproject.toml'
      );
    }

    pyproject.tool.poetry.version = nextRelease.version;

    // Convert back to TOML and write
    const updatedContent = tomlStringify(pyproject);
    await fs.writeFile(pyprojectPath, updatedContent);

    logger.log(`Updated pyproject.toml version to ${nextRelease.version}`);
  } catch (error) {
    throw new SemanticReleaseError(
      'Error updating pyproject.toml',
      error.message
    );
  }
}

// Helper function to convert object back to TOML
function tomlStringify(obj) {
  // Simple implementation - you might want to use a proper TOML stringifier
  let result = '';
  for (const [section, content] of Object.entries(obj)) {
    result += `[${section}]\n`;
    for (const [key, value] of Object.entries(content)) {
      result += `${key} = ${JSON.stringify(value)}\n`;
    }
    result += '\n';
  }
  return result;
}

module.exports = {
  prepare
} 