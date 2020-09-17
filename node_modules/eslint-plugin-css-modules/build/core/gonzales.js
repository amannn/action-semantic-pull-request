'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gonzalesPe = require('gonzales-pe');

var _gonzalesPe2 = _interopRequireDefault(_gonzalesPe);

var _gonzalesPrimitives = require('../../packages/gonzales-primitives');

var _gonzalesPrimitives2 = _interopRequireDefault(_gonzalesPrimitives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  parse: function parse() {
    try {
      return _gonzalesPe2.default.parse.apply(_gonzalesPe2.default, arguments);
    } catch (e) {
      try {
        return _gonzalesPrimitives2.default.parse.apply(_gonzalesPrimitives2.default, arguments);
      } catch (e) {
        return null;
      }
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL2dvbnphbGVzLmpzIl0sIm5hbWVzIjpbInBhcnNlIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ2JBLFNBQU8saUJBQWE7QUFDbEIsUUFBSTtBQUNGLGFBQU8scUJBQVNBLEtBQVQsdUNBQVA7QUFDRCxLQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1YsVUFBSTtBQUNGLGVBQU8sNkJBQWtCRCxLQUFsQiwrQ0FBUDtBQUNELE9BRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDVixlQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFYWSxDIiwiZmlsZSI6ImdvbnphbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdvbnphbGVzIGZyb20gJ2dvbnphbGVzLXBlJztcbmltcG9ydCBnb256YWxlc1ByaW1pdGl2ZSBmcm9tICcuLi8uLi9wYWNrYWdlcy9nb256YWxlcy1wcmltaXRpdmVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwYXJzZTogKC4uLmFyZ3MpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGdvbnphbGVzLnBhcnNlKC4uLmFyZ3MpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBnb256YWxlc1ByaW1pdGl2ZS5wYXJzZSguLi5hcmdzKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIl19