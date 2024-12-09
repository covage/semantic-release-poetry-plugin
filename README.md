# semantic-release-poetry-plugin

![npm-version](https://img.shields.io/npm/v/@covage/semantic-release-poetry-plugin.svg) ![License](https://img.shields.io/badge/License-MIT-blue)

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin for bumping version of Python [Poetry](https://python-poetry.org/) projects.

| Step               | Description                                                                                                 |
|--------------------|-------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Locate and validate a `pyproject.toml` file with a version field.                                           |
| `prepare`          | Update the `pyproject.toml` by changing `tool.poetry.version` without affecting the file structure.         | 

## How to install this plugin

Make sure to install the NPM package `@covage/semantic-release-poetry-plugin`.

In your `.releaserc.yml`, add the plugin in the proper order.
Make sure to commit the change made by this plugin on the `pyproject.toml` file.

For exemple:

```yaml
plugins: [
  "@semantic-release/commit-analyzer",
  '@semantic-release/release-notes-generator',
  "@semantic-release/changelog",
  "@covage/semantic-release-poetry-plugin",
  [
    '@semantic-release/git',
    {
      'assets': ["*.md", "pyproject.toml"],
      'message': "chore(semantic-release): release ${nextRelease.version}"
    }
  ]
]
branches:
  - "main"
```

## Explanation

The `semantic-release-poetry-plugin` is a plugin for the `semantic-release` framework that automates version management for Python projects using Poetry. It specifically targets the `tool.poetry.version` field in the `pyproject.toml` file, ensuring that each new release version tag is synchronized with the version specified in this configuration file. This approach eliminates the need for custom scripts, providing a more streamlined and reliable versioning process that is consistent across projects.

Unlike simpler version-bumping scripts, `semantic-release-poetry-plugin` parses the `pyproject.toml` file to update the version accurately without mistakenly modifying dependency versions or other fields. This is essential for maintaining the integrity of project dependencies and avoiding version mismatches, especially in CI/CD pipelines where automation is key. The plugin is lightweight, integrates easily with GitLab CI/CD and other platforms, and improves the developer experience by reducing the setup overhead and minimizing configuration duplication across repositories.

This plugin is built with Node.js following the `semantic-release` plugin guidelines, and it is distributed under the MIT license. By using `semantic-release-poetry-plugin`, teams can benefit from automated, accurate versioning that aligns with the release workflow, preventing errors that could disrupt deployments and production environments.
