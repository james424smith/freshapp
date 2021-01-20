"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryByAPI = exports.UNSAFE_queryAllByProps = exports.UNSAFE_queryAllByType = exports.UNSAFE_queryByProps = exports.UNSAFE_queryByType = exports.queryAllByTestId = exports.queryAllByDisplayValue = exports.queryAllByPlaceholderText = exports.queryAllByText = exports.queryByTestId = exports.queryByDisplayValue = exports.queryByPlaceholderText = exports.queryByText = void 0;

var React = _interopRequireWildcard(require("react"));

var _getByAPI = require("./getByAPI");

var _errors = require("./errors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const queryByText = instance => function queryByTextFn(text) {
  try {
    return (0, _getByAPI.getByText)(instance)(text);
  } catch (error) {
    return (0, _errors.createQueryByError)(error, queryByTextFn);
  }
};

exports.queryByText = queryByText;

const queryByPlaceholderText = instance => function queryByPlaceholderTextFn(placeholder) {
  try {
    return (0, _getByAPI.getByPlaceholderText)(instance)(placeholder);
  } catch (error) {
    return (0, _errors.createQueryByError)(error, queryByPlaceholderTextFn);
  }
};

exports.queryByPlaceholderText = queryByPlaceholderText;

const queryByDisplayValue = instance => function queryByDisplayValueFn(value) {
  try {
    return (0, _getByAPI.getByDisplayValue)(instance)(value);
  } catch (error) {
    return (0, _errors.createQueryByError)(error, queryByDisplayValueFn);
  }
};

exports.queryByDisplayValue = queryByDisplayValue;

const queryByTestId = instance => function queryByTestIdFn(testID) {
  try {
    return (0, _getByAPI.getByTestId)(instance)(testID);
  } catch (error) {
    return (0, _errors.createQueryByError)(error, queryByTestIdFn);
  }
};

exports.queryByTestId = queryByTestId;

const queryAllByText = instance => text => {
  try {
    return (0, _getByAPI.getAllByText)(instance)(text);
  } catch (error) {
    return [];
  }
};

exports.queryAllByText = queryAllByText;

const queryAllByPlaceholderText = instance => placeholder => {
  try {
    return (0, _getByAPI.getAllByPlaceholderText)(instance)(placeholder);
  } catch (error) {
    return [];
  }
};

exports.queryAllByPlaceholderText = queryAllByPlaceholderText;

const queryAllByDisplayValue = instance => value => {
  try {
    return (0, _getByAPI.getAllByDisplayValue)(instance)(value);
  } catch (error) {
    return [];
  }
};

exports.queryAllByDisplayValue = queryAllByDisplayValue;

const queryAllByTestId = instance => testID => {
  try {
    return (0, _getByAPI.getAllByTestId)(instance)(testID);
  } catch (error) {
    return [];
  }
};

exports.queryAllByTestId = queryAllByTestId;

const UNSAFE_queryByType = instance => function queryByTypeFn(type) {
  try {
    return (0, _getByAPI.UNSAFE_getByType)(instance)(type);
  } catch (error) {
    return (0, _errors.createQueryByError)(error, queryByTypeFn);
  }
};

exports.UNSAFE_queryByType = UNSAFE_queryByType;

const UNSAFE_queryByProps = instance => function queryByPropsFn(props) {
  try {
    return (0, _getByAPI.UNSAFE_getByProps)(instance)(props);
  } catch (error) {
    return (0, _errors.createQueryByError)(error, queryByPropsFn);
  }
};

exports.UNSAFE_queryByProps = UNSAFE_queryByProps;

const UNSAFE_queryAllByType = instance => type => {
  try {
    return (0, _getByAPI.UNSAFE_getAllByType)(instance)(type);
  } catch (error) {
    return [];
  }
};

exports.UNSAFE_queryAllByType = UNSAFE_queryAllByType;

const UNSAFE_queryAllByProps = instance => props => {
  try {
    return (0, _getByAPI.UNSAFE_getAllByProps)(instance)(props);
  } catch (error) {
    return [];
  }
};

exports.UNSAFE_queryAllByProps = UNSAFE_queryAllByProps;

const queryByAPI = instance => ({
  queryByTestId: queryByTestId(instance),
  queryByText: queryByText(instance),
  queryByPlaceholderText: queryByPlaceholderText(instance),
  queryByDisplayValue: queryByDisplayValue(instance),
  queryAllByTestId: queryAllByTestId(instance),
  queryAllByText: queryAllByText(instance),
  queryAllByPlaceholderText: queryAllByPlaceholderText(instance),
  queryAllByDisplayValue: queryAllByDisplayValue(instance),
  // Unsafe
  UNSAFE_queryByType: UNSAFE_queryByType(instance),
  UNSAFE_queryAllByType: UNSAFE_queryAllByType(instance),
  UNSAFE_queryByProps: UNSAFE_queryByProps(instance),
  UNSAFE_queryAllByProps: UNSAFE_queryAllByProps(instance),
  // Removed
  queryByName: () => (0, _errors.throwRemovedFunctionError)('queryByName', 'migration-v2#removed-functions'),
  queryAllByName: () => (0, _errors.throwRemovedFunctionError)('queryAllByName', 'migration-v2#removed-functions'),
  queryByType: () => (0, _errors.throwRemovedFunctionError)('queryByType', 'migration-v2#removed-functions'),
  queryAllByType: () => (0, _errors.throwRemovedFunctionError)('queryAllByType', 'migration-v2#removed-functions'),
  queryByProps: () => (0, _errors.throwRemovedFunctionError)('queryByProps', 'migration-v2#removed-functions'),
  queryAllByProps: () => (0, _errors.throwRemovedFunctionError)('queryAllByProps', 'migration-v2#removed-functions'),
  // Renamed
  queryByPlaceholder: () => (0, _errors.throwRenamedFunctionError)('queryByPlaceholder', 'queryByPlaceholderText'),
  queryAllByPlaceholder: () => (0, _errors.throwRenamedFunctionError)('queryAllByPlaceholder', 'queryAllByPlaceholderText')
});

exports.queryByAPI = queryByAPI;