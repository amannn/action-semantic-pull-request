'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  meta: {
    docs: {
      description: 'Checks that you are using the existent css/scss/less classes',
      recommended: true
    },
    schema: [{
      type: 'object',
      properties: {
        camelCase: { enum: [true, 'dashes', 'only', 'dashes-only'] }
      }
    }]
  },
  create: function create(context) {
    var camelCase = _lodash2.default.get(context, 'options[0].camelCase');

    /*
       maps variable name to property Object
       map = {
         [variableName]: {
           classesMap: { foo: 'foo', fooBar: 'foo-bar', 'foo-bar': 'foo-bar' },
           node: {...}
         }
       }
        example:
       import s from './foo.scss';
       s is variable name
        property Object has two keys
       1. classesMap: an object with propertyName as key and its className as value
       2. node: node that correspond to s (see example above)
     */
    var map = {};

    return {
      ImportDeclaration: function ImportDeclaration(node) {
        var styleImportNodeData = (0, _core.getStyleImportNodeData)(node);

        if (!styleImportNodeData) {
          return;
        }

        var importName = styleImportNodeData.importName,
            styleFilePath = styleImportNodeData.styleFilePath,
            importNode = styleImportNodeData.importNode;


        var styleFileAbsolutePath = (0, _core.getFilePath)(context, styleFilePath);
        var classesMap = {};
        var exportPropsMap = {};

        if ((0, _core.fileExists)(styleFileAbsolutePath)) {
          var ast = (0, _core.getAST)(styleFileAbsolutePath);
          var classes = ast && (0, _core.getStyleClasses)(ast);

          classesMap = classes && (0, _core.getClassesMap)(classes, camelCase);
          exportPropsMap = ast && (0, _core.getExportPropsMap)(ast);
        }

        // this will be used to check if classes are defined
        _lodash2.default.set(map, importName + '.classesMap', classesMap);

        // this will be used to check if :export properties are defined
        _lodash2.default.set(map, importName + '.exportPropsMap', exportPropsMap);

        // save node for reporting unused styles
        _lodash2.default.set(map, importName + '.node', importNode);
      },

      MemberExpression: function MemberExpression(node) {
        /*
           Check if property exists in css/scss file as class
         */

        var objectName = node.object.name;

        var propertyName = (0, _core.getPropertyName)(node, camelCase);

        if (!propertyName) {
          return;
        }

        var classesMap = _lodash2.default.get(map, objectName + '.classesMap');
        var exportPropsMap = _lodash2.default.get(map, objectName + '.exportPropsMap');

        if (classesMap && classesMap[propertyName] == null && exportPropsMap && exportPropsMap[propertyName] == null) {
          context.report(node.property, 'Class or exported property \'' + propertyName + '\' not found');
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9ydWxlcy9uby11bmRlZi1jbGFzcy5qcyJdLCJuYW1lcyI6WyJtZXRhIiwiZG9jcyIsImRlc2NyaXB0aW9uIiwicmVjb21tZW5kZWQiLCJzY2hlbWEiLCJ0eXBlIiwicHJvcGVydGllcyIsImNhbWVsQ2FzZSIsImVudW0iLCJjcmVhdGUiLCJjb250ZXh0IiwiZ2V0IiwibWFwIiwiSW1wb3J0RGVjbGFyYXRpb24iLCJub2RlIiwic3R5bGVJbXBvcnROb2RlRGF0YSIsImltcG9ydE5hbWUiLCJzdHlsZUZpbGVQYXRoIiwiaW1wb3J0Tm9kZSIsInN0eWxlRmlsZUFic29sdXRlUGF0aCIsImNsYXNzZXNNYXAiLCJleHBvcnRQcm9wc01hcCIsImFzdCIsImNsYXNzZXMiLCJzZXQiLCJNZW1iZXJFeHByZXNzaW9uIiwib2JqZWN0TmFtZSIsIm9iamVjdCIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJyZXBvcnQiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztrQkFhZTtBQUNiQSxRQUFNO0FBQ0pDLFVBQU07QUFDSkMsbUJBQWEsOERBRFQ7QUFFSkMsbUJBQWE7QUFGVCxLQURGO0FBS0pDLFlBQVEsQ0FDTjtBQUNFQyxZQUFNLFFBRFI7QUFFRUMsa0JBQVk7QUFDVkMsbUJBQVcsRUFBRUMsTUFBTSxDQUFDLElBQUQsRUFBTyxRQUFQLEVBQWlCLE1BQWpCLEVBQXlCLGFBQXpCLENBQVI7QUFERDtBQUZkLEtBRE07QUFMSixHQURPO0FBZWJDLFFBZmEsa0JBZUxDLE9BZkssRUFlWTtBQUN2QixRQUFNSCxZQUFZLGlCQUFFSSxHQUFGLENBQU1ELE9BQU4sRUFBZSxzQkFBZixDQUFsQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLFFBQU1FLE1BQU0sRUFBWjs7QUFFQSxXQUFPO0FBQ0xDLHVCQURLLDZCQUNjQyxJQURkLEVBQzRCO0FBQy9CLFlBQU1DLHNCQUFzQixrQ0FBdUJELElBQXZCLENBQTVCOztBQUVBLFlBQUksQ0FBQ0MsbUJBQUwsRUFBMEI7QUFDeEI7QUFDRDs7QUFMOEIsWUFRN0JDLFVBUjZCLEdBVzNCRCxtQkFYMkIsQ0FRN0JDLFVBUjZCO0FBQUEsWUFTN0JDLGFBVDZCLEdBVzNCRixtQkFYMkIsQ0FTN0JFLGFBVDZCO0FBQUEsWUFVN0JDLFVBVjZCLEdBVzNCSCxtQkFYMkIsQ0FVN0JHLFVBVjZCOzs7QUFhL0IsWUFBTUMsd0JBQXdCLHVCQUFZVCxPQUFaLEVBQXFCTyxhQUFyQixDQUE5QjtBQUNBLFlBQUlHLGFBQWEsRUFBakI7QUFDQSxZQUFJQyxpQkFBaUIsRUFBckI7O0FBRUEsWUFBSSxzQkFBV0YscUJBQVgsQ0FBSixFQUF1QztBQUNyQyxjQUFNRyxNQUFNLGtCQUFPSCxxQkFBUCxDQUFaO0FBQ0EsY0FBTUksVUFBVUQsT0FBTywyQkFBZ0JBLEdBQWhCLENBQXZCOztBQUVBRix1QkFBYUcsV0FBVyx5QkFBY0EsT0FBZCxFQUF1QmhCLFNBQXZCLENBQXhCO0FBQ0FjLDJCQUFpQkMsT0FBTyw2QkFBa0JBLEdBQWxCLENBQXhCO0FBQ0Q7O0FBRUQ7QUFDQSx5QkFBRUUsR0FBRixDQUFNWixHQUFOLEVBQWNJLFVBQWQsa0JBQXVDSSxVQUF2Qzs7QUFFQTtBQUNBLHlCQUFFSSxHQUFGLENBQU1aLEdBQU4sRUFBY0ksVUFBZCxzQkFBMkNLLGNBQTNDOztBQUVBO0FBQ0EseUJBQUVHLEdBQUYsQ0FBTVosR0FBTixFQUFjSSxVQUFkLFlBQWlDRSxVQUFqQztBQUNELE9BbENJOztBQW1DTE8sd0JBQWtCLDBCQUFDWCxJQUFELEVBQWtCO0FBQ2xDOzs7O0FBSUEsWUFBTVksYUFBYVosS0FBS2EsTUFBTCxDQUFZQyxJQUEvQjs7QUFFQSxZQUFNQyxlQUFlLDJCQUFnQmYsSUFBaEIsRUFBc0JQLFNBQXRCLENBQXJCOztBQUVBLFlBQUksQ0FBQ3NCLFlBQUwsRUFBbUI7QUFDakI7QUFDRDs7QUFFRCxZQUFNVCxhQUFhLGlCQUFFVCxHQUFGLENBQU1DLEdBQU4sRUFBY2MsVUFBZCxpQkFBbkI7QUFDQSxZQUFNTCxpQkFBaUIsaUJBQUVWLEdBQUYsQ0FBTUMsR0FBTixFQUFjYyxVQUFkLHFCQUF2Qjs7QUFFQSxZQUFJTixjQUFjQSxXQUFXUyxZQUFYLEtBQTRCLElBQTFDLElBQ0FSLGNBREEsSUFDa0JBLGVBQWVRLFlBQWYsS0FBZ0MsSUFEdEQsRUFDNEQ7QUFDMURuQixrQkFBUW9CLE1BQVIsQ0FBZWhCLEtBQUtpQixRQUFwQixvQ0FBNkRGLFlBQTdEO0FBQ0Q7QUFDRjtBQXZESSxLQUFQO0FBeUREO0FBOUZZLEMiLCJmaWxlIjoibm8tdW5kZWYtY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgZ2V0U3R5bGVJbXBvcnROb2RlRGF0YSxcbiAgZ2V0QVNULFxuICBmaWxlRXhpc3RzLFxuICBnZXRTdHlsZUNsYXNzZXMsXG4gIGdldFByb3BlcnR5TmFtZSxcbiAgZ2V0Q2xhc3Nlc01hcCxcbiAgZ2V0RXhwb3J0UHJvcHNNYXAsXG4gIGdldEZpbGVQYXRoLFxufSBmcm9tICcuLi9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBKc05vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2hlY2tzIHRoYXQgeW91IGFyZSB1c2luZyB0aGUgZXhpc3RlbnQgY3NzL3Njc3MvbGVzcyBjbGFzc2VzJyxcbiAgICAgIHJlY29tbWVuZGVkOiB0cnVlLFxuICAgIH0sXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgY2FtZWxDYXNlOiB7IGVudW06IFt0cnVlLCAnZGFzaGVzJywgJ29ubHknLCAnZGFzaGVzLW9ubHknXSB9XG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbiAgY3JlYXRlIChjb250ZXh0OiBPYmplY3QpIHtcbiAgICBjb25zdCBjYW1lbENhc2UgPSBfLmdldChjb250ZXh0LCAnb3B0aW9uc1swXS5jYW1lbENhc2UnKTtcblxuICAgIC8qXG4gICAgICAgbWFwcyB2YXJpYWJsZSBuYW1lIHRvIHByb3BlcnR5IE9iamVjdFxuICAgICAgIG1hcCA9IHtcbiAgICAgICAgIFt2YXJpYWJsZU5hbWVdOiB7XG4gICAgICAgICAgIGNsYXNzZXNNYXA6IHsgZm9vOiAnZm9vJywgZm9vQmFyOiAnZm9vLWJhcicsICdmb28tYmFyJzogJ2Zvby1iYXInIH0sXG4gICAgICAgICAgIG5vZGU6IHsuLi59XG4gICAgICAgICB9XG4gICAgICAgfVxuXG4gICAgICAgZXhhbXBsZTpcbiAgICAgICBpbXBvcnQgcyBmcm9tICcuL2Zvby5zY3NzJztcbiAgICAgICBzIGlzIHZhcmlhYmxlIG5hbWVcblxuICAgICAgIHByb3BlcnR5IE9iamVjdCBoYXMgdHdvIGtleXNcbiAgICAgICAxLiBjbGFzc2VzTWFwOiBhbiBvYmplY3Qgd2l0aCBwcm9wZXJ0eU5hbWUgYXMga2V5IGFuZCBpdHMgY2xhc3NOYW1lIGFzIHZhbHVlXG4gICAgICAgMi4gbm9kZTogbm9kZSB0aGF0IGNvcnJlc3BvbmQgdG8gcyAoc2VlIGV4YW1wbGUgYWJvdmUpXG4gICAgICovXG4gICAgY29uc3QgbWFwID0ge307XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24gKG5vZGU6IEpzTm9kZSkge1xuICAgICAgICBjb25zdCBzdHlsZUltcG9ydE5vZGVEYXRhID0gZ2V0U3R5bGVJbXBvcnROb2RlRGF0YShub2RlKTtcblxuICAgICAgICBpZiAoIXN0eWxlSW1wb3J0Tm9kZURhdGEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgaW1wb3J0TmFtZSxcbiAgICAgICAgICBzdHlsZUZpbGVQYXRoLFxuICAgICAgICAgIGltcG9ydE5vZGUsXG4gICAgICAgIH0gPSBzdHlsZUltcG9ydE5vZGVEYXRhO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlRmlsZUFic29sdXRlUGF0aCA9IGdldEZpbGVQYXRoKGNvbnRleHQsIHN0eWxlRmlsZVBhdGgpO1xuICAgICAgICBsZXQgY2xhc3Nlc01hcCA9IHt9O1xuICAgICAgICBsZXQgZXhwb3J0UHJvcHNNYXAgPSB7fTtcblxuICAgICAgICBpZiAoZmlsZUV4aXN0cyhzdHlsZUZpbGVBYnNvbHV0ZVBhdGgpKSB7XG4gICAgICAgICAgY29uc3QgYXN0ID0gZ2V0QVNUKHN0eWxlRmlsZUFic29sdXRlUGF0aCk7XG4gICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGFzdCAmJiBnZXRTdHlsZUNsYXNzZXMoYXN0KTtcblxuICAgICAgICAgIGNsYXNzZXNNYXAgPSBjbGFzc2VzICYmIGdldENsYXNzZXNNYXAoY2xhc3NlcywgY2FtZWxDYXNlKTtcbiAgICAgICAgICBleHBvcnRQcm9wc01hcCA9IGFzdCAmJiBnZXRFeHBvcnRQcm9wc01hcChhc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcyB3aWxsIGJlIHVzZWQgdG8gY2hlY2sgaWYgY2xhc3NlcyBhcmUgZGVmaW5lZFxuICAgICAgICBfLnNldChtYXAsIGAke2ltcG9ydE5hbWV9LmNsYXNzZXNNYXBgLCBjbGFzc2VzTWFwKTtcblxuICAgICAgICAvLyB0aGlzIHdpbGwgYmUgdXNlZCB0byBjaGVjayBpZiA6ZXhwb3J0IHByb3BlcnRpZXMgYXJlIGRlZmluZWRcbiAgICAgICAgXy5zZXQobWFwLCBgJHtpbXBvcnROYW1lfS5leHBvcnRQcm9wc01hcGAsIGV4cG9ydFByb3BzTWFwKTtcblxuICAgICAgICAvLyBzYXZlIG5vZGUgZm9yIHJlcG9ydGluZyB1bnVzZWQgc3R5bGVzXG4gICAgICAgIF8uc2V0KG1hcCwgYCR7aW1wb3J0TmFtZX0ubm9kZWAsIGltcG9ydE5vZGUpO1xuICAgICAgfSxcbiAgICAgIE1lbWJlckV4cHJlc3Npb246IChub2RlOiBKc05vZGUpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgQ2hlY2sgaWYgcHJvcGVydHkgZXhpc3RzIGluIGNzcy9zY3NzIGZpbGUgYXMgY2xhc3NcbiAgICAgICAgICovXG5cbiAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IG5vZGUub2JqZWN0Lm5hbWU7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gZ2V0UHJvcGVydHlOYW1lKG5vZGUsIGNhbWVsQ2FzZSk7XG5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc2VzTWFwID0gXy5nZXQobWFwLCBgJHtvYmplY3ROYW1lfS5jbGFzc2VzTWFwYCk7XG4gICAgICAgIGNvbnN0IGV4cG9ydFByb3BzTWFwID0gXy5nZXQobWFwLCBgJHtvYmplY3ROYW1lfS5leHBvcnRQcm9wc01hcGApO1xuXG4gICAgICAgIGlmIChjbGFzc2VzTWFwICYmIGNsYXNzZXNNYXBbcHJvcGVydHlOYW1lXSA9PSBudWxsICYmXG4gICAgICAgICAgICBleHBvcnRQcm9wc01hcCAmJiBleHBvcnRQcm9wc01hcFtwcm9wZXJ0eU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLnByb3BlcnR5LCBgQ2xhc3Mgb3IgZXhwb3J0ZWQgcHJvcGVydHkgJyR7cHJvcGVydHlOYW1lfScgbm90IGZvdW5kYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuIl19