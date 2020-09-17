const naturalCompare = require("natural-compare-lite");

/**
 * Get's the "name" of the node, which could be an Identifier,
 * StringLiteral, or NumberLiteral, etc.
 *
 * This returned string is used to sort nodes of the same type.
 */
function getNodeName(node) {
  switch (node.type) {
    case "Property":
      return getNodeName(node.key);
    case "Identifier":
      return node.name;
    case "Literal":
      return node.value.toString();
    case "RestElement":
    case "RestProperty":
    case "ExperimentalRestProperty":
      return node.argument.name;
    default:
      return node.type;
  }
}

/**
 * Determines if the node is a RestElement, accounting for different
 * parsers.
 */
function isRestProperty({ type }) {
  return (
    type === "RestElement" ||
    type === "RestProperty" ||
    type === "ExperimentalRestProperty"
  );
}

/**
 * Returns whether or not a node is safe to be sorted.
 */
function shouldCheck(node) {
  const { value } = node;

  return (
    isRestProperty(node) ||
    value.type === "Identifier" ||
    (value.type === "ObjectPattern" && value.properties.every(shouldCheck)) ||
    (value.type === "AssignmentPattern" && value.right.type === "Literal")
  );
}

/**
 * Sort priority for node types.
 */
const NODE_TYPE_SORT_ORDER = {
  /* ObjectPattern children */
  Property: 1,
  RestElement: 99,
  RestProperty: 99,
  ExperimentalRestProperty: 99,

  /* Property keys */
  Identifier: 1,
  Literal: 1,
  TemplateLiteral: 2,
  ComputedProperty: 2,
};

const SORT_ORDER_DEFAULT = 98;

function getSortOrder(node) {
  return isComputedProperty(node)
    ? NODE_TYPE_SORT_ORDER.ComputedProperty
    : NODE_TYPE_SORT_ORDER[node.type] || SORT_ORDER_DEFAULT;
}

/**
 * Returns true if the node is a "real", computed property. We don't consider
 * computed properties with a literal value to be a "real" computed property. This
 * is useful since that means they can be sorted.
 */
function isComputedProperty(node) {
  return node.computed && node.key.type !== "Literal";
}

/**
 * Returns a function that will sort two nodes found in an `ObjectPattern`.
 *
 * TODO: Maybe it makes sense to do a topological sort here based on identifiers?
 * Ideally we wouldn't need to arbitrarily skip sorting nodes because we are worried
 * about breaking the code.
 */
function createSorter(caseSensitive) {
  const sortName = (a) => (caseSensitive ? a : a.toLowerCase());

  return (a, b) => {
    // When we have different node "types"
    const nodeResult = getSortOrder(a) - getSortOrder(b);
    if (nodeResult !== 0) return nodeResult;

    // When the keys have different "types"
    const keyResult = getSortOrder(a.key) - getSortOrder(b.key);
    if (keyResult !== 0) return keyResult;

    return naturalCompare(sortName(getNodeName(a)), sortName(getNodeName(b)));
  };
}

/**
 * Creates a "fixer" function to be used by `--fix`.
 */
function createFix({ context, fixer, node, sorter }) {
  const sourceCode = context.getSourceCode();
  const sourceText = sourceCode.getText();

  const sorted = node.properties.concat().sort(sorter);

  const newText = sorted
    .map((child, i) => {
      const textAfter =
        i === sorted.length - 1
          ? // If it's the last item, there's no text after to append.
            ""
          : // Otherwise, we need to grab the text after the original node.
            sourceText.slice(
              node.properties[i].range[1], // End index of the current node .
              node.properties[i + 1].range[0] // Start index of the next node.
            );

      return sourceCode.getText(child) + textAfter;
    })
    .join("");

  return fixer.replaceTextRange(
    [
      node.properties[0].range[0], // Start index of the first node.
      node.properties[node.properties.length - 1].range[1], // End index of the last node.
    ],
    newText
  );
}

module.exports = {
  meta: {
    docs: {
      description: "require object destructure keys to be sorted",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: "code",
    messages: {
      sort: `Expected object keys to be in sorted order. Expected {{first}} to be before {{second}}.`,
    },
    schema: [
      {
        type: "object",
        properties: {
          caseSensitive: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const { caseSensitive = true } = options;
    const sorter = createSorter(caseSensitive);

    return {
      ObjectPattern(node) {
        /*
         * If the node is more complex than just basic destructuring
         * with literal defaults, we just skip it. If some values use
         * previous values as defaults, then we cannot simply sort them.
         */
        if (!node.properties.every(shouldCheck)) {
          return;
        }

        let prevNode = null;

        for (const nextNode of node.properties) {
          if (prevNode && sorter(prevNode, nextNode) > 0) {
            context.report({
              node: nextNode,
              messageId: "sort",
              data: {
                first: getNodeName(nextNode),
                second: getNodeName(prevNode),
              },
              fix: (fixer) =>
                createFix({
                  context,
                  caseSensitive,
                  fixer,
                  node,
                  sorter,
                }),
            });

            break;
          }

          prevNode = nextNode;
        }
      },
    };
  },
};
