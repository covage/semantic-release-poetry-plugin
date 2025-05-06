function replaceTomlToolPoetryVersion(content, newVersion) {
    let newContent = content;

    // Try tool.poetry section first
    const toolPoetrySectionStart = content.indexOf("[tool.poetry]");
    if (toolPoetrySectionStart !== -1) {
        const toolPoetryVersionLineStart = toolPoetrySectionStart + content.substring(toolPoetrySectionStart).indexOf("version = ");
        if (toolPoetryVersionLineStart !== -1) {
            const toolPoetryVersionValueStart = toolPoetryVersionLineStart + content.substring(toolPoetryVersionLineStart).indexOf('"');
            const lineEndRelativePos = content.substring(toolPoetryVersionLineStart).indexOf('\n');
            let versionLineEnd = toolPoetryVersionLineStart + lineEndRelativePos;
            if (lineEndRelativePos === -1) {
                versionLineEnd = content.length;
            }
            return content.substring(0, toolPoetryVersionValueStart) + '"' + newVersion + '"' + content.substring(versionLineEnd);
        }
    }

    // If not found, try project section (uv)
    const projectSectionStart = content.indexOf("[project]");
    if (projectSectionStart !== -1) {
        const projectVersionLineStart = projectSectionStart + content.substring(projectSectionStart).indexOf("version = ");
        if (projectVersionLineStart !== -1) {
            const projectVersionValueStart = projectVersionLineStart + content.substring(projectVersionLineStart).indexOf('"');
            const lineEndRelativePos = content.substring(projectVersionLineStart).indexOf('\n');
            let versionLineEnd = projectVersionLineStart + lineEndRelativePos;
            if (lineEndRelativePos === -1) {
                versionLineEnd = content.length;
            }
            return content.substring(0, projectVersionValueStart) + '"' + newVersion + '"' + content.substring(versionLineEnd);
        }
    }

    // If neither section found or no version in either section
    if (toolPoetrySectionStart === -1 && projectSectionStart === -1) {
        throw new Error("Could not find [tool.poetry] or [project] section in pyproject.toml");
    }
    throw new Error("Could not find version key in pyproject.toml");
}

module.exports = {
    replaceTomlToolPoetryVersion
};
