import { DECLARATION_TYPES, ARG_TYPES } from '../constants/EsprimaConstants';
import { isNonEmptyArray } from '../utils/Utils';

function getFunctionByDeclaration(declaration, source) {
  // TODO support function declarations
  if (declaration.type !== ARG_TYPES.IDENTIFIER) { return undefined; }

  return source.find((node) => {
    const type = node.type;
    const declarations = node.declarations;
    return (
      type === DECLARATION_TYPES.VAR_DECLARATION &&
      isNonEmptyArray(declarations) &&
      declarations[0].id &&
      declarations[0].id.name === declaration.name
    );
  });
}

/**
 * Responsbile for extracting the redux container's mapping functions
 * @param {Object} source The parsed JS to extract the functions from.
 * @return {Object} The function declarations, if available. Object will not be undefined and will
 *                  take the form of:
 *  - @property {Object} mapStateToProps The map state to props function. May be undefined if not
 *                                       declared.
 *  - @property {Object} mapDispatchToProps The map dispatch to props function. May be undefined if
 *                                          not declared.
 */
export default function (source) {
  if (!Array.isArray(source)) { return {}; }

  const defaultExportNode = source.find(node => node.type === DECLARATION_TYPES.DEFAULT_EXPORT);
  if (!defaultExportNode ||
    !defaultExportNode.declaration ||
    !defaultExportNode.declaration.callee ||
    !isNonEmptyArray(defaultExportNode.declaration.callee.arguments)) {
    return {};
  }

  const connectArguments = defaultExportNode.declaration.callee.arguments;

  if (connectArguments.length === 1) {
    return { mapStateToProps: getFunctionByDeclaration(connectArguments[0], source) };
  }

  return {
    mapStateToProps: getFunctionByDeclaration(connectArguments[0], source),
    mapDispatchToProps: getFunctionByDeclaration(connectArguments[1], source),
  };
}
