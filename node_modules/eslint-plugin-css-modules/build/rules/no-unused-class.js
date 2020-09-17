'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _core = require('../core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  meta: {
    docs: {
      description: 'Checks that you are using all css/scss/less classes',
      recommended: true
    },
    schema: [{
      type: 'object',
      properties: {
        camelCase: { enum: [true, 'dashes', 'only', 'dashes-only'] },
        markAsUsed: { type: 'array' }
      }
    }]
  },
  create: function create(context) {
    var markAsUsed = _lodash2.default.get(context, 'options[0].markAsUsed');
    var camelCase = _lodash2.default.get(context, 'options[0].camelCase');

    /*
       maps variable name to property Object
       map = {
         [variableName]: {
           classes: { foo: false, 'foo-bar': false },
           classesMap: { foo: 'foo', fooBar: 'foo-bar', 'foo-bar': 'foo-bar' },
           node: {...}
         }
       }
        example:
       import s from './foo.scss';
       s is variable name
        property Object has two keys
       1. classes: an object with className as key and a boolean as value. The boolean is marked if it is used in file
       2. classesMap: an object with propertyName as key and its className as value
       3. node: node that correspond to s (see example above)
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

        var classes = {};
        var classesMap = {};

        if ((0, _core.fileExists)(styleFileAbsolutePath)) {
          // this will be used to mark s.foo as used in MemberExpression
          var ast = (0, _core.getAST)(styleFileAbsolutePath);
          classes = ast && (0, _core.getStyleClasses)(ast);
          classesMap = classes && (0, _core.getClassesMap)(classes, camelCase);
        }

        _lodash2.default.set(map, importName + '.classes', classes);
        _lodash2.default.set(map, importName + '.classesMap', classesMap);

        // save node for reporting unused styles
        _lodash2.default.set(map, importName + '.node', importNode);

        // save file path for reporting unused styles
        _lodash2.default.set(map, importName + '.filePath', styleFilePath);
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

        var className = _lodash2.default.get(map, objectName + '.classesMap.' + propertyName);

        if (className == null) {
          return;
        }

        // mark this property has used
        _lodash2.default.set(map, objectName + '.classes.' + className, true);
      },
      'Program:exit': function ProgramExit() {
        /*
           Check if all classes defined in css/scss file are used
         */

        /*
           we are looping over each import style node in program
           example:
           ```
             import s from './foo.css';
             import x from './bar.scss';
           ```
           then the loop will be run 2 times
         */
        _lodash2.default.forIn(map, function (o) {
          var classes = o.classes,
              node = o.node,
              filePath = o.filePath;

          /*
             if option is passed to mark a class as used, example:
             eslint css-modules/no-unused-class: [2, { markAsUsed: ['container'] }]
           */

          _lodash2.default.forEach(markAsUsed, function (usedClass) {
            classes[usedClass] = true;
          });

          // classNames not marked as true are unused
          var unusedClasses = _fp2.default.compose(_fp2.default.keys, _fp2.default.omitBy(_fp2.default.identity))(classes);

          if (!_lodash2.default.isEmpty(unusedClasses)) {
            context.report(node, 'Unused classes found in ' + _path2.default.basename(filePath) + ': ' + unusedClasses.join(', '));
          }
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9ydWxlcy9uby11bnVzZWQtY2xhc3MuanMiXSwibmFtZXMiOlsibWV0YSIsImRvY3MiLCJkZXNjcmlwdGlvbiIsInJlY29tbWVuZGVkIiwic2NoZW1hIiwidHlwZSIsInByb3BlcnRpZXMiLCJjYW1lbENhc2UiLCJlbnVtIiwibWFya0FzVXNlZCIsImNyZWF0ZSIsImNvbnRleHQiLCJnZXQiLCJtYXAiLCJJbXBvcnREZWNsYXJhdGlvbiIsIm5vZGUiLCJzdHlsZUltcG9ydE5vZGVEYXRhIiwiaW1wb3J0TmFtZSIsInN0eWxlRmlsZVBhdGgiLCJpbXBvcnROb2RlIiwic3R5bGVGaWxlQWJzb2x1dGVQYXRoIiwiY2xhc3NlcyIsImNsYXNzZXNNYXAiLCJhc3QiLCJzZXQiLCJNZW1iZXJFeHByZXNzaW9uIiwib2JqZWN0TmFtZSIsIm9iamVjdCIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJjbGFzc05hbWUiLCJmb3JJbiIsIm8iLCJmaWxlUGF0aCIsImZvckVhY2giLCJ1c2VkQ2xhc3MiLCJ1bnVzZWRDbGFzc2VzIiwiY29tcG9zZSIsImtleXMiLCJvbWl0QnkiLCJpZGVudGl0eSIsImlzRW1wdHkiLCJyZXBvcnQiLCJiYXNlbmFtZSIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O2tCQVllO0FBQ2JBLFFBQU07QUFDSkMsVUFBTTtBQUNKQyxtQkFBYSxxREFEVDtBQUVKQyxtQkFBYTtBQUZULEtBREY7QUFLSkMsWUFBUSxDQUNOO0FBQ0VDLFlBQU0sUUFEUjtBQUVFQyxrQkFBWTtBQUNWQyxtQkFBVyxFQUFFQyxNQUFNLENBQUMsSUFBRCxFQUFPLFFBQVAsRUFBaUIsTUFBakIsRUFBeUIsYUFBekIsQ0FBUixFQUREO0FBRVZDLG9CQUFZLEVBQUVKLE1BQU0sT0FBUjtBQUZGO0FBRmQsS0FETTtBQUxKLEdBRE87QUFnQmJLLFFBaEJhLGtCQWdCTEMsT0FoQkssRUFnQlk7QUFDdkIsUUFB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QUwsQ0FBY1YsUUFBZCxDQUFoRCxVQUE0RUcsY0FBY1EsSUFBZCxDQUFtQixJQUFuQixDQUE1RTtBQUNEO0FBQ0YsU0FwQkQ7QUFxQkQ7QUEzRkksS0FBUDtBQTZGRDtBQXRJWSxDIiwiZmlsZSI6Im5vLXVudXNlZC1jbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5pbXBvcnQgZnAgZnJvbSAnbG9kYXNoL2ZwJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHtcbiAgZ2V0U3R5bGVJbXBvcnROb2RlRGF0YSxcbiAgZ2V0U3R5bGVDbGFzc2VzLFxuICBnZXRQcm9wZXJ0eU5hbWUsXG4gIGdldENsYXNzZXNNYXAsXG4gIGdldEZpbGVQYXRoLFxuICBnZXRBU1QsXG4gIGZpbGVFeGlzdHMsXG59IGZyb20gJy4uL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IEpzTm9kZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgZGVzY3JpcHRpb246ICdDaGVja3MgdGhhdCB5b3UgYXJlIHVzaW5nIGFsbCBjc3Mvc2Nzcy9sZXNzIGNsYXNzZXMnLFxuICAgICAgcmVjb21tZW5kZWQ6IHRydWUsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBjYW1lbENhc2U6IHsgZW51bTogW3RydWUsICdkYXNoZXMnLCAnb25seScsICdkYXNoZXMtb25seSddIH0sXG4gICAgICAgICAgbWFya0FzVXNlZDogeyB0eXBlOiAnYXJyYXknIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbiAgY3JlYXRlIChjb250ZXh0OiBPYmplY3QpIHtcbiAgICBjb25zdCBtYXJrQXNVc2VkID0gXy5nZXQoY29udGV4dCwgJ29wdGlvbnNbMF0ubWFya0FzVXNlZCcpO1xuICAgIGNvbnN0IGNhbWVsQ2FzZSA9IF8uZ2V0KGNvbnRleHQsICdvcHRpb25zWzBdLmNhbWVsQ2FzZScpO1xuXG4gICAgLypcbiAgICAgICBtYXBzIHZhcmlhYmxlIG5hbWUgdG8gcHJvcGVydHkgT2JqZWN0XG4gICAgICAgbWFwID0ge1xuICAgICAgICAgW3ZhcmlhYmxlTmFtZV06IHtcbiAgICAgICAgICAgY2xhc3NlczogeyBmb286IGZhbHNlLCAnZm9vLWJhcic6IGZhbHNlIH0sXG4gICAgICAgICAgIGNsYXNzZXNNYXA6IHsgZm9vOiAnZm9vJywgZm9vQmFyOiAnZm9vLWJhcicsICdmb28tYmFyJzogJ2Zvby1iYXInIH0sXG4gICAgICAgICAgIG5vZGU6IHsuLi59XG4gICAgICAgICB9XG4gICAgICAgfVxuXG4gICAgICAgZXhhbXBsZTpcbiAgICAgICBpbXBvcnQgcyBmcm9tICcuL2Zvby5zY3NzJztcbiAgICAgICBzIGlzIHZhcmlhYmxlIG5hbWVcblxuICAgICAgIHByb3BlcnR5IE9iamVjdCBoYXMgdHdvIGtleXNcbiAgICAgICAxLiBjbGFzc2VzOiBhbiBvYmplY3Qgd2l0aCBjbGFzc05hbWUgYXMga2V5IGFuZCBhIGJvb2xlYW4gYXMgdmFsdWUuIFRoZSBib29sZWFuIGlzIG1hcmtlZCBpZiBpdCBpcyB1c2VkIGluIGZpbGVcbiAgICAgICAyLiBjbGFzc2VzTWFwOiBhbiBvYmplY3Qgd2l0aCBwcm9wZXJ0eU5hbWUgYXMga2V5IGFuZCBpdHMgY2xhc3NOYW1lIGFzIHZhbHVlXG4gICAgICAgMy4gbm9kZTogbm9kZSB0aGF0IGNvcnJlc3BvbmQgdG8gcyAoc2VlIGV4YW1wbGUgYWJvdmUpXG4gICAgICovXG4gICAgY29uc3QgbWFwID0ge307XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24gKG5vZGU6IEpzTm9kZSkge1xuICAgICAgICBjb25zdCBzdHlsZUltcG9ydE5vZGVEYXRhID0gZ2V0U3R5bGVJbXBvcnROb2RlRGF0YShub2RlKTtcblxuICAgICAgICBpZiAoIXN0eWxlSW1wb3J0Tm9kZURhdGEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgaW1wb3J0TmFtZSxcbiAgICAgICAgICBzdHlsZUZpbGVQYXRoLFxuICAgICAgICAgIGltcG9ydE5vZGUsXG4gICAgICAgIH0gPSBzdHlsZUltcG9ydE5vZGVEYXRhO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlRmlsZUFic29sdXRlUGF0aCA9IGdldEZpbGVQYXRoKGNvbnRleHQsIHN0eWxlRmlsZVBhdGgpO1xuXG4gICAgICAgIGxldCBjbGFzc2VzID0ge307XG4gICAgICAgIGxldCBjbGFzc2VzTWFwID0ge307XG5cbiAgICAgICAgaWYgKGZpbGVFeGlzdHMoc3R5bGVGaWxlQWJzb2x1dGVQYXRoKSkge1xuICAgICAgICAgIC8vIHRoaXMgd2lsbCBiZSB1c2VkIHRvIG1hcmsgcy5mb28gYXMgdXNlZCBpbiBNZW1iZXJFeHByZXNzaW9uXG4gICAgICAgICAgY29uc3QgYXN0ID0gZ2V0QVNUKHN0eWxlRmlsZUFic29sdXRlUGF0aCk7XG4gICAgICAgICAgY2xhc3NlcyA9IGFzdCAmJiBnZXRTdHlsZUNsYXNzZXMoYXN0KTtcbiAgICAgICAgICBjbGFzc2VzTWFwID0gY2xhc3NlcyAmJiBnZXRDbGFzc2VzTWFwKGNsYXNzZXMsIGNhbWVsQ2FzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBfLnNldChtYXAsIGAke2ltcG9ydE5hbWV9LmNsYXNzZXNgLCBjbGFzc2VzKTtcbiAgICAgICAgXy5zZXQobWFwLCBgJHtpbXBvcnROYW1lfS5jbGFzc2VzTWFwYCwgY2xhc3Nlc01hcCk7XG5cbiAgICAgICAgLy8gc2F2ZSBub2RlIGZvciByZXBvcnRpbmcgdW51c2VkIHN0eWxlc1xuICAgICAgICBfLnNldChtYXAsIGAke2ltcG9ydE5hbWV9Lm5vZGVgLCBpbXBvcnROb2RlKTtcblxuICAgICAgICAvLyBzYXZlIGZpbGUgcGF0aCBmb3IgcmVwb3J0aW5nIHVudXNlZCBzdHlsZXNcbiAgICAgICAgXy5zZXQobWFwLCBgJHtpbXBvcnROYW1lfS5maWxlUGF0aGAsIHN0eWxlRmlsZVBhdGgpO1xuICAgICAgfSxcbiAgICAgIE1lbWJlckV4cHJlc3Npb246IChub2RlOiBKc05vZGUpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgQ2hlY2sgaWYgcHJvcGVydHkgZXhpc3RzIGluIGNzcy9zY3NzIGZpbGUgYXMgY2xhc3NcbiAgICAgICAgICovXG5cbiAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IG5vZGUub2JqZWN0Lm5hbWU7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IGdldFByb3BlcnR5TmFtZShub2RlLCBjYW1lbENhc2UpO1xuXG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gXy5nZXQobWFwLCBgJHtvYmplY3ROYW1lfS5jbGFzc2VzTWFwLiR7cHJvcGVydHlOYW1lfWApO1xuXG4gICAgICAgIGlmIChjbGFzc05hbWUgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1hcmsgdGhpcyBwcm9wZXJ0eSBoYXMgdXNlZFxuICAgICAgICBfLnNldChtYXAsIGAke29iamVjdE5hbWV9LmNsYXNzZXMuJHtjbGFzc05hbWV9YCwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgJ1Byb2dyYW06ZXhpdCcgKCkge1xuICAgICAgICAvKlxuICAgICAgICAgICBDaGVjayBpZiBhbGwgY2xhc3NlcyBkZWZpbmVkIGluIGNzcy9zY3NzIGZpbGUgYXJlIHVzZWRcbiAgICAgICAgICovXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgd2UgYXJlIGxvb3Bpbmcgb3ZlciBlYWNoIGltcG9ydCBzdHlsZSBub2RlIGluIHByb2dyYW1cbiAgICAgICAgICAgZXhhbXBsZTpcbiAgICAgICAgICAgYGBgXG4gICAgICAgICAgICAgaW1wb3J0IHMgZnJvbSAnLi9mb28uY3NzJztcbiAgICAgICAgICAgICBpbXBvcnQgeCBmcm9tICcuL2Jhci5zY3NzJztcbiAgICAgICAgICAgYGBgXG4gICAgICAgICAgIHRoZW4gdGhlIGxvb3Agd2lsbCBiZSBydW4gMiB0aW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgXy5mb3JJbihtYXAsIChvKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBjbGFzc2VzLCBub2RlLCBmaWxlUGF0aCB9ID0gbztcblxuICAgICAgICAgIC8qXG4gICAgICAgICAgICAgaWYgb3B0aW9uIGlzIHBhc3NlZCB0byBtYXJrIGEgY2xhc3MgYXMgdXNlZCwgZXhhbXBsZTpcbiAgICAgICAgICAgICBlc2xpbnQgY3NzLW1vZHVsZXMvbm8tdW51c2VkLWNsYXNzOiBbMiwgeyBtYXJrQXNVc2VkOiBbJ2NvbnRhaW5lciddIH1dXG4gICAgICAgICAgICovXG4gICAgICAgICAgXy5mb3JFYWNoKG1hcmtBc1VzZWQsICh1c2VkQ2xhc3MpID0+IHtcbiAgICAgICAgICAgIGNsYXNzZXNbdXNlZENsYXNzXSA9IHRydWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBjbGFzc05hbWVzIG5vdCBtYXJrZWQgYXMgdHJ1ZSBhcmUgdW51c2VkXG4gICAgICAgICAgY29uc3QgdW51c2VkQ2xhc3NlcyA9IGZwLmNvbXBvc2UoXG4gICAgICAgICAgICBmcC5rZXlzLFxuICAgICAgICAgICAgZnAub21pdEJ5KGZwLmlkZW50aXR5KSwgLy8gb21pdCB0cnV0aHkgdmFsdWVzXG4gICAgICAgICAgKShjbGFzc2VzKTtcblxuICAgICAgICAgIGlmICghXy5pc0VtcHR5KHVudXNlZENsYXNzZXMpKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBgVW51c2VkIGNsYXNzZXMgZm91bmQgaW4gJHtwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKX06ICR7dW51c2VkQ2xhc3Nlcy5qb2luKCcsICcpfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcbiJdfQ==