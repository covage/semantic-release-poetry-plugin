function replaceTomlToolPoetryVersion(content, newVersion) {
    let newContent = content;

    // find the first occurence of version after tool.poetry
    const toolPoetrySectionStart = content.indexOf("[tool.poetry]");
    if (toolPoetrySectionStart === -1) {
        throw new Error("Could not find [tool.poetry] section in pyproject.toml");
    }
    const toolPoetryVersionLineStart = toolPoetrySectionStart + content.substring(toolPoetrySectionStart).indexOf("version = ");
    const toolPoetryVersionValueStart = toolPoetryVersionLineStart + content.substring(toolPoetryVersionLineStart).indexOf('"');
    if (toolPoetryVersionLineStart === -1) {
        throw new Error("Could not find tool.poetry.version key in pyproject.toml");
    }
    const lineEndRelativePos = content.substring(toolPoetryVersionLineStart).indexOf('\n');
    let versionLineEnd = toolPoetryVersionLineStart + lineEndRelativePos;
    if (lineEndRelativePos === -1) {
        versionLineEnd = content.length;
    }
    newContent = content.substring(0, toolPoetryVersionValueStart) + '"' + newVersion + '"' + content.substring(versionLineEnd);

    return newContent;
}

module.exports = {
    replaceTomlToolPoetryVersion
};
